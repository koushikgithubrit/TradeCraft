// @ts-ignore
import type {} from 'pdfjs-dist/build/pdf';

import { PDFDocument } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import type { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';

// Initialize PDF.js worker with local file
const workerPath = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).href;
GlobalWorkerOptions.workerSrc = workerPath;

export type PDFContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; dataUrl: string };

export interface PDFContent {
  title: string;
  pages: number;
  sections: Section[];
}

interface Section {
  title: string;
  blocks: PDFContentBlock[];
}

const pdfCache: Record<string, PDFContent> = {};

export const pdfService = {
  async parsePDF(pdfPath: string): Promise<PDFContent> {
    if (pdfCache[pdfPath]) {
      return pdfCache[pdfPath];
    }
    try {
      const response = await fetch(pdfPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const loadingTask = getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      let sections: Section[] = [];
      let currentSection: Section | null = null;
      let title = '';

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const operatorList = await page.getOperatorList();
        const blocks: PDFContentBlock[] = [];

        // Extract text blocks
        let lastY = null;
        let paragraph = '';
        for (const item of textContent.items) {
          if ('str' in item) {
            // Try to preserve line breaks
            if (lastY !== null && Math.abs(lastY - item.transform[5]) > 10) {
              if (paragraph.trim()) {
                blocks.push({ type: 'text', text: paragraph.trim() });
                paragraph = '';
              }
            }
            paragraph += item.str + ' ';
            lastY = item.transform[5];
          }
        }
        if (paragraph.trim()) {
          blocks.push({ type: 'text', text: paragraph.trim() });
        }

        // Extract images (basic approach)
        // This is a simplified version and may not extract all images, but works for most PDFs
        const canvas = document.createElement('canvas');
        const viewport = page.getViewport({ scale: 2 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');
        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          // Convert the whole page to an image (as a fallback)
          const dataUrl = canvas.toDataURL('image/png');
          // Optionally, you could try to extract individual images, but this is more complex
          // For now, add the full page image as a block
          blocks.push({ type: 'image', dataUrl });
        }

        // Section splitting (optional, you can improve this logic)
        const sectionTitle = i === 1 ? 'Introduction' : `Page ${i}`;
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: sectionTitle,
          blocks,
        };

        // Extract title from first page
        if (i === 1 && textContent.items.length > 0) {
          title = textContent.items.slice(0, 5).map((item) => ('str' in item ? item.str : '')).join(' ');
        }
      }
      if (currentSection) {
        sections.push(currentSection);
      }
      if (!title) title = 'Untitled Document';
      const result: PDFContent = {
        title,
        pages: numPages,
        sections,
      };
      pdfCache[pdfPath] = result;
      return result;
    } catch (error: any) {
      throw new Error(`Failed to parse PDF: ${error.message || 'Unknown error'}`);
    }
  },

  isSectionHeader(line: string): boolean {
    // Check if line might be a section header
    const trimmedLine = line.trim();
    return (
      trimmedLine.length > 0 &&
      (
        // All caps
        trimmedLine === trimmedLine.toUpperCase() ||
        // Ends with colon
        trimmedLine.endsWith(':') ||
        // Starts with number and dot
        /^\d+\./.test(trimmedLine) ||
        // Common section indicators
        /^(Chapter|Section|Part|Unit)\s+\d+/i.test(trimmedLine) ||
        // Headers with specific formatting
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*$/.test(trimmedLine)
      )
    );
  }
}; 