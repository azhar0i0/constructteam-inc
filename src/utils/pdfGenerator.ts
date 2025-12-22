import jsPDF from 'jspdf';
import { EstimateData } from '@/types/estimate';

export const generateEstimatePDF = async (elementId: string, data: EstimateData) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = margin;

  const addNewPageIfNeeded = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Colors
  const primaryColor: [number, number, number] = [37, 99, 235]; // Blue
  const accentColor: [number, number, number] = [139, 92, 246]; // Purple
  const textColor: [number, number, number] = [30, 30, 30];
  const mutedColor: [number, number, number] = [100, 100, 100];

  // Header with gradient-like effect
  pdf.setFillColor(...primaryColor);
  pdf.rect(0, 0, pageWidth, 50, 'F');
  
  // Company name and ESTIMATE title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ESTIMATE', margin, 22);
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.company.name || 'Your Company', margin, 32);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  if (data.company.email) pdf.text(`Email: ${data.company.email}`, margin, 39);
  if (data.company.phone) pdf.text(`Phone: ${data.company.phone}`, margin, 44);
  
  // Estimate number and dates on right
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  const estimateNum = data.project.estimateNumber || 'DRAFT';
  pdf.text(estimateNum, pageWidth - margin - pdf.getTextWidth(estimateNum), 22);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  const dateText = `Date: ${new Date().toLocaleDateString()}`;
  pdf.text(dateText, pageWidth - margin - pdf.getTextWidth(dateText), 32);
  
  const validText = `Valid Until: ${new Date(data.project.validUntil).toLocaleDateString()}`;
  pdf.text(validText, pageWidth - margin - pdf.getTextWidth(validText), 39);

  yPos = 60;

  // Bill To Section
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BILL TO:', margin, yPos);
  yPos += 6;

  pdf.setTextColor(...textColor);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.client.companyName || 'Client Name', margin, yPos);
  yPos += 5;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(...mutedColor);
  if (data.client.contactName) {
    pdf.text(data.client.contactName, margin, yPos);
    yPos += 4;
  }
  if (data.client.address) {
    const address = `${data.client.address}, ${data.client.city}, ${data.client.state} ${data.client.zipCode}`;
    pdf.text(address, margin, yPos);
    yPos += 4;
  }
  if (data.client.email || data.client.phone) {
    const contact = [data.client.email, data.client.phone].filter(Boolean).join(' | ');
    pdf.text(contact, margin, yPos);
    yPos += 4;
  }

  yPos += 6;

  // Project Details
  if (data.project.title || data.project.description) {
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROJECT DETAILS:', margin, yPos);
    yPos += 6;

    pdf.setTextColor(...textColor);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    if (data.project.title) {
      pdf.text(data.project.title, margin, yPos);
      yPos += 5;
    }

    if (data.project.description) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(...mutedColor);
      const descLines = pdf.splitTextToSize(data.project.description, contentWidth);
      pdf.text(descLines, margin, yPos);
      yPos += descLines.length * 4;
    }
    yPos += 6;
  }

  // Services & Pricing
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('SERVICES & PRICING:', margin, yPos);
  yPos += 8;

  // Process each section
  data.sections.forEach((section) => {
    addNewPageIfNeeded(20);
    
    // Section header
    pdf.setFillColor(245, 247, 250);
    pdf.rect(margin, yPos - 4, contentWidth, 8, 'F');
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(section.title || 'Section', margin + 2, yPos);
    yPos += 8;

    // Line items
    section.lineItems.forEach((item) => {
      addNewPageIfNeeded(15);
      
      // Item name
      pdf.setTextColor(...textColor);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(item.name || 'Service', margin + 2, yPos);
      
      // Amount on right
      const amount = `$${item.amount.toFixed(2)}`;
      pdf.text(amount, pageWidth - margin - pdf.getTextWidth(amount), yPos);
      yPos += 4;

      // Description
      if (item.description) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(...mutedColor);
        const descLines = pdf.splitTextToSize(item.description, contentWidth - 40);
        pdf.text(descLines, margin + 2, yPos);
        yPos += descLines.length * 3;
      }

      // Qty and rate
      pdf.setFontSize(8);
      pdf.text(`Qty: ${item.quantity} × $${item.rate.toFixed(2)}`, margin + 2, yPos);
      yPos += 5;

      // Separator line
      pdf.setDrawColor(230, 230, 230);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 3;
    });

    yPos += 4;
  });

  // Totals
  addNewPageIfNeeded(40);
  yPos += 5;

  const allLineItems = data.sections.flatMap(section => section.lineItems);
  const subtotal = allLineItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * data.taxRate;
  const total = subtotal + tax;

  const totalsX = pageWidth - margin - 60;
  
  pdf.setTextColor(...mutedColor);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Subtotal:', totalsX, yPos);
  pdf.text(`$${subtotal.toFixed(2)}`, pageWidth - margin - pdf.getTextWidth(`$${subtotal.toFixed(2)}`), yPos);
  yPos += 5;

  pdf.text(`Tax (${(data.taxRate * 100).toFixed(1)}%):`, totalsX, yPos);
  pdf.text(`$${tax.toFixed(2)}`, pageWidth - margin - pdf.getTextWidth(`$${tax.toFixed(2)}`), yPos);
  yPos += 6;

  // Total with background
  pdf.setFillColor(245, 247, 250);
  pdf.rect(totalsX - 5, yPos - 4, 65, 10, 'F');
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('TOTAL:', totalsX, yPos);
  pdf.text(`$${total.toFixed(2)}`, pageWidth - margin - pdf.getTextWidth(`$${total.toFixed(2)}`), yPos);
  yPos += 15;

  // Payment Information
  addNewPageIfNeeded(50);
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PAYMENT INFORMATION:', margin, yPos);
  yPos += 6;

  pdf.setTextColor(...textColor);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');

  if (data.paymentInfo.acceptedMethods.length > 0) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('Accepted Methods:', margin, yPos);
    pdf.setFont('helvetica', 'normal');
    yPos += 4;
    pdf.setTextColor(...mutedColor);
    pdf.text(data.paymentInfo.acceptedMethods.join(', '), margin, yPos);
    yPos += 5;
  }

  if (data.paymentInfo.notes) {
    pdf.setTextColor(...textColor);
    const paymentNoteLines = pdf.splitTextToSize(data.paymentInfo.notes, contentWidth);
    paymentNoteLines.forEach((line: string) => {
      addNewPageIfNeeded(5);
      pdf.text(line, margin, yPos);
      yPos += 4;
    });
  }

  yPos += 8;

  // Terms & Conditions
  addNewPageIfNeeded(30);
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('TERMS & CONDITIONS:', margin, yPos);
  yPos += 6;

  pdf.setTextColor(...mutedColor);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');

  if (data.termsConditions.notes) {
    const termsLines = pdf.splitTextToSize(data.termsConditions.notes, contentWidth);
    termsLines.forEach((line: string) => {
      addNewPageIfNeeded(4);
      pdf.text(line, margin, yPos);
      yPos += 3.5;
    });
  }

  // Footer on last page
  const footerY = pageHeight - 10;
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  pdf.setTextColor(...mutedColor);
  pdf.setFontSize(8);
  pdf.text('Thank you for your business!', pageWidth / 2 - 20, footerY);

  // Save PDF
  const fileName = `estimate-${data.project.estimateNumber || 'draft'}.pdf`;
  pdf.save(fileName);
};
