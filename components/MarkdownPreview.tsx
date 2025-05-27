import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface MarkdownPreviewProps {
  htmlContent: string;
  pdfTitle: string;
  onPdfTitleChange: (title: string) => void;
  onExportPDF: () => void;
  isLoadingPdf: boolean;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  htmlContent,
  pdfTitle,
  onPdfTitleChange,
  onExportPDF,
  isLoadingPdf,
}) => {

  return (
    <div className="flex flex-col h-full">
      <div className="markdown-preview-header bg-white rounded-t-lg shadow-lg p-4 border-b border-slate-200 flex items-center justify-between space-x-4 sticky top-[60px] md:top-[68px] z-40"> {/* Added markdown-preview-header class and adjusted top sticky position */}
        <h2 className="text-xl font-medium text-slate-700">Live Preview</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="pdfTitle" className="text-sm font-medium text-slate-600 whitespace-nowrap">PDF Title:</label>
          <input
            type="text"
            id="pdfTitle"
            value={pdfTitle}
            onChange={(e) => onPdfTitleChange(e.target.value)}
            placeholder="Enter PDF filename"
            className="px-2 py-1.5 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm w-40"
            aria-label="PDF Title Input"
          />
          <button
            onClick={onExportPDF}
            disabled={isLoadingPdf}
            className={`px-3 py-1.5 text-sm font-medium text-white rounded-md shadow-sm flex items-center space-x-2 transition-colors duration-150
                        ${isLoadingPdf 
                          ? 'bg-slate-400 cursor-not-allowed' 
                          : 'bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'}`}
            aria-label="Export to PDF"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>{isLoadingPdf ? 'Exporting...' : 'Export PDF'}</span>
          </button>
        </div>
      </div>
      <div 
        id="markdown-preview-content"
        className="markdown-preview flex-grow overflow-y-auto bg-white rounded-b-lg shadow-lg"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        aria-live="polite"
      />
    </div>
  );
};