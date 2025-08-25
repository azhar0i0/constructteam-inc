import jsPDF from 'jspdf';
import { EstimateData } from '@/types/estimate';

export const generateEstimatePDF = async (estimateData: EstimateData): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Colors
    const primaryColor = '#2563eb';
    const secondaryColor = '#64748b';
    const accentColor = '#f8fafc';
    
    let currentY = margin;

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const fontSize = options.fontSize || 10;
      const maxWidth = options.maxWidth || contentWidth;
      const lineHeight = options.lineHeight || fontSize * 0.4;
      
      pdf.setFontSize(fontSize);
      pdf.setTextColor(options.color || '#000000');
      
      if (options.bold) pdf.setFont('helvetica', 'bold');
      else pdf.setFont('helvetica', 'normal');
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      
      lines.forEach((line: string, index: number) => {
        pdf.text(line, x, y + (index * lineHeight));
      });
      
      return y + (lines.length * lineHeight);
    };

    // Header with gradient-like design
    pdf.setFillColor(37, 99, 235); // Primary color
    pdf.rect(0, 0, pageWidth, 60, 'F');
    
    // Company name and logo area
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ESTIMATE', margin, 30);
    
    pdf.setFontSize(16);
    pdf.text(estimateData.company.name, margin, 45);
    
    // Estimate number badge
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(pageWidth - 80, 15, 60, 20, 3, 3, 'F');
    pdf.setTextColor(37, 99, 235);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(estimateData.project.estimateNumber, pageWidth - 75, 27);
    
    currentY = 70;

    // Company and Client Info Section
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, currentY, contentWidth, 35, 'F');
    
    // Company info (left side)
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('FROM:', margin + 5, currentY + 10);
    
    let companyY = currentY + 15;
    companyY = addText(estimateData.company.name, margin + 5, companyY, { fontSize: 10, bold: true });
    companyY = addText(`${estimateData.company.email} | ${estimateData.company.phone}`, margin + 5, companyY + 2, { fontSize: 9, color: secondaryColor });
    addText(`${estimateData.company.address}, ${estimateData.company.city}, ${estimateData.company.state} ${estimateData.company.zipCode}`, margin + 5, companyY + 2, { fontSize: 9, color: secondaryColor, maxWidth: 80 });

    // Client info (right side)
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TO:', margin + 105, currentY + 10);
    
    let clientY = currentY + 15;
    clientY = addText(estimateData.client.companyName, margin + 105, clientY, { fontSize: 10, bold: true });
    clientY = addText(estimateData.client.contactName, margin + 105, clientY + 2, { fontSize: 10 });
    clientY = addText(`${estimateData.client.email} | ${estimateData.client.phone}`, margin + 105, clientY + 2, { fontSize: 9, color: secondaryColor });
    addText(`${estimateData.client.address}, ${estimateData.client.city}, ${estimateData.client.state} ${estimateData.client.zipCode}`, margin + 105, clientY + 2, { fontSize: 9, color: secondaryColor, maxWidth: 80 });

    currentY += 45;

    // Project Details
    pdf.setFillColor(37, 99, 235);
    pdf.rect(margin, currentY, contentWidth, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROJECT DETAILS', margin + 2, currentY + 5);
    
    currentY += 12;
    pdf.setTextColor(0, 0, 0);
    currentY = addText(estimateData.project.title, margin, currentY, { fontSize: 12, bold: true });
    currentY = addText(estimateData.project.description, margin, currentY + 3, { fontSize: 10, color: secondaryColor, maxWidth: contentWidth });
    
    currentY += 10;

    // Services Table Header
    pdf.setFillColor(37, 99, 235);
    pdf.rect(margin, currentY, contentWidth, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SERVICES & PRICING', margin + 2, currentY + 5);
    
    currentY += 12;

    // Table headers
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, currentY, contentWidth, 8, 'F');
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Description', margin + 2, currentY + 5);
    pdf.text('Qty', margin + 110, currentY + 5);
    pdf.text('Rate', margin + 130, currentY + 5);
    pdf.text('Amount', margin + 150, currentY + 5);
    
    currentY += 12;

    // Calculate totals
    const allLineItems = estimateData.sections.flatMap(section => section.lineItems);
    const subtotal = allLineItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * estimateData.taxRate;
    const total = subtotal + tax;

    // Services table content (compact)
    let itemCount = 0;
    const maxItems = 8; // Limit items to fit on one page
    
    estimateData.sections.forEach((section) => {
      if (itemCount >= maxItems) return;
      
      // Section header
      pdf.setFillColor(240, 242, 247);
      pdf.rect(margin, currentY, contentWidth, 6, 'F');
      pdf.setTextColor(37, 99, 235);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text(section.title, margin + 2, currentY + 4);
      currentY += 8;

      // Line items
      section.lineItems.forEach((item) => {
        if (itemCount >= maxItems) return;
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        
        // Description (truncated if too long)
        const shortDesc = item.description.length > 45 ? item.description.substring(0, 42) + '...' : item.description;
        pdf.text(shortDesc, margin + 2, currentY + 4);
        pdf.text(item.quantity.toString(), margin + 112, currentY + 4);
        pdf.text(`$${item.rate.toFixed(2)}`, margin + 130, currentY + 4);
        pdf.text(`$${item.amount.toFixed(2)}`, margin + 150, currentY + 4);
        
        currentY += 6;
        itemCount++;
      });
    });

    // Totals section
    currentY += 5;
    const totalsX = margin + 110;
    const totalsWidth = 70;
    
    pdf.setFillColor(248, 250, 252);
    pdf.rect(totalsX, currentY, totalsWidth, 25, 'F');
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Subtotal:', totalsX + 2, currentY + 6);
    pdf.text(`$${subtotal.toFixed(2)}`, totalsX + 45, currentY + 6);
    
    pdf.text(`Tax (${(estimateData.taxRate * 100).toFixed(1)}%):`, totalsX + 2, currentY + 12);
    pdf.text(`$${tax.toFixed(2)}`, totalsX + 45, currentY + 12);
    
    // Total
    pdf.setFillColor(37, 99, 235);
    pdf.rect(totalsX, currentY + 15, totalsWidth, 8, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TOTAL:', totalsX + 2, currentY + 20);
    pdf.text(`$${total.toFixed(2)}`, totalsX + 35, currentY + 20);

    currentY += 35;

    // Payment & Terms Section (compact)
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, currentY, contentWidth, 30, 'F');
    
    // Payment info (left column)
    pdf.setTextColor(37, 99, 235);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PAYMENT INFO', margin + 2, currentY + 8);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    const paymentMethods = estimateData.paymentInfo.acceptedMethods.join(', ') || 'Bank Transfer, Check';
    addText(`Methods: ${paymentMethods}`, margin + 2, currentY + 12, { fontSize: 8, maxWidth: 85 });
    
    if (estimateData.paymentInfo.bankName) {
      addText(`Bank: ${estimateData.paymentInfo.bankName}`, margin + 2, currentY + 18, { fontSize: 8, maxWidth: 85 });
    }

    // Terms (right column)
    pdf.setTextColor(37, 99, 235);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TERMS & CONDITIONS', margin + 95, currentY + 8);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    addText(`• Valid for ${estimateData.termsConditions.validityPeriod}`, margin + 95, currentY + 12, { fontSize: 8, maxWidth: 85 });
    addText(`• ${estimateData.termsConditions.depositRequired} deposit required`, margin + 95, currentY + 16, { fontSize: 8, maxWidth: 85 });
    addText(`• ${estimateData.termsConditions.paymentTerms}`, margin + 95, currentY + 20, { fontSize: 8, maxWidth: 85 });

    // Footer
    currentY = pageHeight - 25;
    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, currentY, pageWidth, 25, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, currentY + 8);
    pdf.text(`Valid until ${new Date(estimateData.project.validUntil).toLocaleDateString()}`, margin, currentY + 15);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Thank you for your business!', pageWidth - 80, currentY + 12);

    // Generate filename
    const fileName = `Estimate_${estimateData.project.estimateNumber}_${estimateData.client.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    
    // Download the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};