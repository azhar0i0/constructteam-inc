import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EstimateData } from '@/types/estimate';

export const generateEstimatePDF = async (elementId: string, data: EstimateData) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element not found');
  }

  // Temporarily modify styles for better PDF rendering
  const originalStyle = element.style.cssText;
  element.style.maxWidth = '1200px';
  element.style.margin = '0 auto';
  element.style.fontSize = '14px';
  element.style.lineHeight = '1.4';

  try {
    // Get the content dimensions with higher quality for PDF
    const canvas = await html2canvas(element, {
      scale: 3, // Higher resolution for crisp PDF
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: 1200, // Fixed width for consistency
      windowHeight: element.scrollHeight + 100,
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    // Calculate dimensions to fit content on single page with margins
    const margin = 10; // 10mm margin
    const availableWidth = pdfWidth - (margin * 2);
    const availableHeight = pdfHeight - (margin * 2);
    
    const imgAspectRatio = canvas.width / canvas.height;
    
    let finalWidth = availableWidth;
    let finalHeight = finalWidth / imgAspectRatio;
    
    // If height exceeds available space, scale by height instead
    if (finalHeight > availableHeight) {
      finalHeight = availableHeight;
      finalWidth = finalHeight * imgAspectRatio;
    }
    
    // Center the content
    const x = (pdfWidth - finalWidth) / 2;
    const y = (pdfHeight - finalHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight, undefined, 'FAST');
    
    const fileName = `estimate-${data.project.estimateNumber || 'draft'}.pdf`;
    pdf.save(fileName);
  } finally {
    // Restore original styles
    element.style.cssText = originalStyle;
  }
};