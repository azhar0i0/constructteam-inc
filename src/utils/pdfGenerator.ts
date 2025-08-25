import jsPDF from 'jspdf';
import { EstimateData } from '@/types/estimate';

export const generateEstimatePDF = async (estimateData: EstimateData): Promise<void> => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    // Professional color palette
    const colors = {
      primary: [26, 32, 56],      // Dark navy
      secondary: [59, 130, 246],   // Professional blue
      accent: [16, 185, 129],      // Premium green
      text: [31, 41, 55],          // Charcoal
      lightText: [107, 114, 128],  // Gray
      background: [249, 250, 251], // Light gray
      white: [255, 255, 255],
      border: [229, 231, 235]
    };

    let currentY = 0;

    // Helper functions
    const setColor = (colorArray: number[]) => {
      pdf.setTextColor(colorArray[0], colorArray[1], colorArray[2]);
    };

    const setFillColor = (colorArray: number[]) => {
      pdf.setFillColor(colorArray[0], colorArray[1], colorArray[2]);
    };

    const addShadowBox = (x: number, y: number, width: number, height: number, fillColor: number[] = colors.white) => {
      // Shadow
      pdf.setFillColor(0, 0, 0, 0.1);
      pdf.roundedRect(x + 1, y + 1, width, height, 2, 2, 'F');
      // Main box
      setFillColor(fillColor);
      pdf.roundedRect(x, y, width, height, 2, 2, 'F');
      // Border
      pdf.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
      pdf.setLineWidth(0.2);
      pdf.roundedRect(x, y, width, height, 2, 2, 'S');
    };

    // Premium header with gradient effect simulation
    setFillColor(colors.primary);
    pdf.rect(0, 0, pageWidth, 70, 'F');
    
    // Header accent stripe
    setFillColor(colors.secondary);
    pdf.rect(0, 65, pageWidth, 5, 'F');

    // Logo placeholder (premium circle)
    setFillColor(colors.white);
    pdf.circle(35, 25, 12, 'F');
    setFillColor(colors.secondary);
    pdf.circle(35, 25, 10, 'F');
    
    // Company initial in logo
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    const companyInitial = estimateData.company.name.charAt(0).toUpperCase();
    pdf.text(companyInitial, 31, 29);

    // Header text
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROFESSIONAL ESTIMATE', 55, 28);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(estimateData.company.name.toUpperCase(), 55, 38);
    
    pdf.setFontSize(10);
    pdf.text('Excellence in Construction Services', 55, 46);

    // Estimate number badge (premium style)
    setFillColor(colors.accent);
    pdf.roundedRect(pageWidth - 65, 15, 50, 25, 4, 4, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ESTIMATE #', pageWidth - 60, 24);
    pdf.setFontSize(12);
    pdf.text(estimateData.project.estimateNumber, pageWidth - 60, 32);

    currentY = 85;

    // Company and Client cards with shadows
    const cardHeight = 45;
    
    // FROM card
    addShadowBox(margin, currentY, (contentWidth / 2) - 5, cardHeight);
    setColor(colors.secondary);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('FROM', margin + 8, currentY + 10);
    
    setColor(colors.text);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(estimateData.company.name, margin + 8, currentY + 18);
    
    setColor(colors.lightText);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(estimateData.company.email, margin + 8, currentY + 25);
    pdf.text(estimateData.company.phone, margin + 8, currentY + 31);
    pdf.text(`${estimateData.company.city}, ${estimateData.company.state}`, margin + 8, currentY + 37);

    // TO card
    addShadowBox(margin + (contentWidth / 2) + 5, currentY, (contentWidth / 2) - 5, cardHeight);
    setColor(colors.secondary);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BILL TO', margin + (contentWidth / 2) + 13, currentY + 10);
    
    setColor(colors.text);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(estimateData.client.companyName, margin + (contentWidth / 2) + 13, currentY + 18);
    
    setColor(colors.lightText);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(estimateData.client.contactName, margin + (contentWidth / 2) + 13, currentY + 25);
    pdf.text(estimateData.client.email, margin + (contentWidth / 2) + 13, currentY + 31);
    pdf.text(`${estimateData.client.city}, ${estimateData.client.state}`, margin + (contentWidth / 2) + 13, currentY + 37);

    currentY += cardHeight + 15;

    // Project details section
    addShadowBox(margin, currentY, contentWidth, 35);
    
    // Section header with icon
    setFillColor(colors.background);
    pdf.roundedRect(margin + 3, currentY + 3, contentWidth - 6, 12, 1, 1, 'F');
    
    setColor(colors.secondary);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('📋 PROJECT DETAILS', margin + 8, currentY + 11);
    
    setColor(colors.text);
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.text(estimateData.project.title, margin + 8, currentY + 22);
    
    setColor(colors.lightText);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    // Wrap project description
    const maxDescWidth = contentWidth - 16;
    const descLines = pdf.splitTextToSize(estimateData.project.description, maxDescWidth);
    let descY = currentY + 28;
    descLines.slice(0, 2).forEach((line: string) => {
      pdf.text(line, margin + 8, descY);
      descY += 4;
    });

    currentY += 45;

    // Services table with premium styling
    addShadowBox(margin, currentY, contentWidth, 85);
    
    // Table header
    setFillColor(colors.primary);
    pdf.roundedRect(margin + 3, currentY + 3, contentWidth - 6, 15, 2, 2, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('💼 SERVICES & INVESTMENT', margin + 8, currentY + 13);

    // Table column headers
    const tableY = currentY + 22;
    setFillColor(colors.background);
    pdf.rect(margin + 5, tableY, contentWidth - 10, 10, 'F');
    
    setColor(colors.text);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DESCRIPTION', margin + 8, tableY + 6);
    pdf.text('QTY', margin + 115, tableY + 6);
    pdf.text('RATE', margin + 135, tableY + 6);
    pdf.text('AMOUNT', margin + 160, tableY + 6);

    // Table content
    let tableRowY = tableY + 15;
    const allLineItems = estimateData.sections.flatMap(section => section.lineItems);
    const subtotal = allLineItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * estimateData.taxRate;
    const total = subtotal + tax;

    // Display key services (limit to fit)
    let displayedItems = 0;
    const maxDisplayItems = 6;

    estimateData.sections.forEach((section) => {
      if (displayedItems >= maxDisplayItems) return;
      
      section.lineItems.forEach((item) => {
        if (displayedItems >= maxDisplayItems) return;
        
        // Alternate row colors
        if (displayedItems % 2 === 0) {
          setFillColor([252, 252, 252]);
          pdf.rect(margin + 5, tableRowY - 3, contentWidth - 10, 8, 'F');
        }
        
        setColor(colors.text);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        
        const shortDesc = item.description.length > 50 ? item.description.substring(0, 47) + '...' : item.description;
        pdf.text(shortDesc, margin + 8, tableRowY + 2);
        pdf.text(item.quantity.toString(), margin + 118, tableRowY + 2);
        pdf.text(`$${item.rate.toFixed(2)}`, margin + 135, tableRowY + 2);
        
        setColor(colors.secondary);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`$${item.amount.toFixed(2)}`, margin + 160, tableRowY + 2);
        
        tableRowY += 8;
        displayedItems++;
      });
    });

    currentY += 90;

    // Premium totals section
    const totalsWidth = 80;
    const totalsX = pageWidth - margin - totalsWidth;
    
    addShadowBox(totalsX, currentY, totalsWidth, 40);
    
    // Subtotal
    setColor(colors.lightText);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Subtotal', totalsX + 8, currentY + 12);
    setColor(colors.text);
    pdf.text(`$${subtotal.toFixed(2)}`, totalsX + 50, currentY + 12);
    
    // Tax
    setColor(colors.lightText);
    pdf.text(`Tax (${(estimateData.taxRate * 100).toFixed(1)}%)`, totalsX + 8, currentY + 20);
    setColor(colors.text);
    pdf.text(`$${tax.toFixed(2)}`, totalsX + 50, currentY + 20);

    // Total with premium styling
    setFillColor(colors.secondary);
    pdf.roundedRect(totalsX + 5, currentY + 25, totalsWidth - 10, 12, 2, 2, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TOTAL', totalsX + 10, currentY + 33);
    pdf.setFontSize(14);
    pdf.text(`$${total.toFixed(2)}`, totalsX + 45, currentY + 33);

    currentY += 50;

    // Terms and payment section
    addShadowBox(margin, currentY, contentWidth, 35);
    
    // Left side - Payment
    setColor(colors.secondary);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('💳 PAYMENT OPTIONS', margin + 8, currentY + 12);
    
    setColor(colors.text);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    const paymentMethods = estimateData.paymentInfo.acceptedMethods.join(' • ') || 'Bank Transfer • Check • Credit Card';
    pdf.text(paymentMethods, margin + 8, currentY + 20);
    
    if (estimateData.paymentInfo.bankName) {
      pdf.text(`Bank: ${estimateData.paymentInfo.bankName}`, margin + 8, currentY + 26);
    }

    // Right side - Terms
    setColor(colors.secondary);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('📋 TERMS & CONDITIONS', margin + 105, currentY + 12);
    
    setColor(colors.text);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`✓ Valid for ${estimateData.termsConditions.validityPeriod}`, margin + 105, currentY + 20);
    pdf.text(`✓ ${estimateData.termsConditions.depositRequired} deposit required`, margin + 105, currentY + 25);
    pdf.text('✓ Professional installation included', margin + 105, currentY + 30);

    // Premium footer
    currentY = pageHeight - 40;
    setFillColor(colors.primary);
    pdf.rect(0, currentY, pageWidth, 40, 'F');
    
    // Footer accent
    setFillColor(colors.accent);
    pdf.rect(0, currentY, pageWidth, 3, 'F');
    
    // Footer content
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Thank you for choosing our premium services', margin, currentY + 15);
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, currentY + 23);
    pdf.text(`Valid until: ${new Date(estimateData.project.validUntil).toLocaleDateString()}`, margin, currentY + 30);
    
    // QR code placeholder
    setFillColor(colors.white);
    pdf.roundedRect(pageWidth - 40, currentY + 8, 25, 25, 2, 2, 'F');
    setColor(colors.primary);
    pdf.setFontSize(8);
    pdf.text('QR CODE', pageWidth - 35, currentY + 22);

    // Contact info in footer
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.text(`${estimateData.company.email} • ${estimateData.company.phone}`, pageWidth - 120, currentY + 15);

    // Generate filename
    const fileName = `Premium_Estimate_${estimateData.project.estimateNumber}_${estimateData.client.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    
    // Download the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};