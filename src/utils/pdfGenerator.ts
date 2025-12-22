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
    
    // Calculate dimensions to fit content
    const margin = 5;
    const availableWidth = pdfWidth - (margin * 2);
    
    const imgAspectRatio = canvas.width / canvas.height;
    const imgWidth = availableWidth;
    const imgHeight = imgWidth / imgAspectRatio;
    
    // If content is taller than one page, add multiple pages
    const pageContentHeight = pdfHeight - (margin * 2);
    const totalPages = Math.ceil(imgHeight / pageContentHeight);
    
    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }
      
      // Calculate the portion of the image to show on this page
      const sourceY = (page * pageContentHeight / imgHeight) * canvas.height;
      const sourceHeight = (pageContentHeight / imgHeight) * canvas.height;
      
      // Create a temporary canvas for this page's content
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(sourceHeight, canvas.height - sourceY);
      
      const ctx = pageCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          canvas,
          0, sourceY, canvas.width, pageCanvas.height,
          0, 0, canvas.width, pageCanvas.height
        );
        
        const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
        const pageImgHeight = (pageCanvas.height / canvas.width) * imgWidth;
        
        pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidth, pageImgHeight, undefined, 'FAST');
      }
    }
    
    const fileName = `estimate-${data.project.estimateNumber || 'draft'}.pdf`;
    pdf.save(fileName);
  } finally {
    // Restore original styles
    element.style.cssText = originalStyle;
  }
};
