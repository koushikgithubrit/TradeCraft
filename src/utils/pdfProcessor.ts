import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

interface ProcessedPage {
  content: string;
  images: string[];
}

export const processPDFPage = async (
  pdfBuffer: ArrayBuffer,
  pageNumber: number
): Promise<ProcessedPage> => {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const page = pdfDoc.getPage(pageNumber - 1);
    
    // Load PDF with pdfjs
    const pdf = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
    const pdfPage = await pdf.getPage(pageNumber);
    const textContent = await pdfPage.getTextContent();
    const content = textContent.items.map((item: any) => item.str).join(' ');
    
    // Extract images (placeholder - actual implementation will depend on PDF structure)
    const images: string[] = [];
    
    return {
      content,
      images,
    };
  } catch (error) {
    console.error('Error processing PDF page:', error);
    throw error;
  }
};

export const getTotalPages = async (pdfBuffer: ArrayBuffer): Promise<number> => {
  try {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    return pdfDoc.getPageCount();
  } catch (error) {
    console.error('Error getting total pages:', error);
    throw error;
  }
}; 