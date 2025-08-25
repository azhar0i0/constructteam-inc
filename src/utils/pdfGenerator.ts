import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EstimateData } from '@/types/estimate';

export const generateEstimatePDF = async (elementId: string, estimateData: EstimateData): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      height: element.scrollHeight,
      width: element.scrollWidth,
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions for single page PDF
    const maxWidth = 210; // A4 width in mm
    const maxHeight = 295; // A4 height in mm
    
    // Calculate scaling to fit everything on one page
    const widthRatio = maxWidth / (canvas.width * 0.264583); // Convert pixels to mm
    const heightRatio = maxHeight / (canvas.height * 0.264583); // Convert pixels to mm
    const scale = Math.min(widthRatio, heightRatio); // Use smaller ratio to ensure it fits
    
    const imgWidth = (canvas.width * 0.264583) * scale;
    const imgHeight = (canvas.height * 0.264583) * scale;
    
    // Center the image on the page
    const xOffset = (maxWidth - imgWidth) / 2;
    const yOffset = (maxHeight - imgHeight) / 2;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add single page with all content scaled to fit
    pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);

    // Generate filename
    const fileName = `Estimate_${estimateData.project.estimateNumber}_${estimateData.client.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    
    // Download the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};