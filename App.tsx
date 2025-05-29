import React, { useState, useEffect, useCallback } from 'react';
import ReactGA from 'react-ga4';
import { MarkdownInput } from './components/MarkdownInput';
import { MarkdownPreview } from './components/MarkdownPreview';
import { parseMarkdown } from './services/markdownService';
import { exportToPdf } from './services/pdfService';
import { DEFAULT_MARKDOWN_CONTENT, DEFAULT_PDF_FILENAME } from './constants';

const App: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>(DEFAULT_MARKDOWN_CONTENT);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [pdfTitle, setPdfTitle] = useState<string>(DEFAULT_PDF_FILENAME);
  const [isLoadingPdf, setIsLoadingPdf] = useState<boolean>(false);

  useEffect(() => {
    const processMarkdown = async () => {
      const parsedHtml = await parseMarkdown(markdownText);
      setHtmlContent(parsedHtml);
    };
    processMarkdown();
  }, [markdownText]);

  const handleMarkdownChange = useCallback((newText: string) => {
    setMarkdownText(newText);
  }, []);

  const handlePdfTitleChange = useCallback((newTitle: string) => {
    setPdfTitle(newTitle);
  }, []);

  const handleExportPdf = useCallback(async () => {
    console.log("handleExportPdf called. Setting isLoadingPdf to true.");
    setIsLoadingPdf(true);
    try {
      await exportToPdf(pdfTitle);
      console.log("exportToPdf promise resolved. Print dialog should have been handled by now.");
      
      // 发送GA事件
      // 确保 VITE_GA_MEASUREMENT_ID 存在（即GA已初始化）
      if (import.meta.env.VITE_GA_MEASUREMENT_ID) { 
        ReactGA.event({
          category: "UserAction",
          action: "Clicked Export PDF",
          label: pdfTitle || "Untitled PDF", 
        });
        console.log("GA event 'Clicked Export PDF' sent.");
     }

      setTimeout(() => {
        console.log("Re-enabling export button.");
        setIsLoadingPdf(false);
      }, 1000); 
    } catch (error) {
      console.error("Failed to initiate PDF export via browser print (error from exportToPdf):", error);
      alert("导出 PDF 时发生错误。请检查控制台获取详情。");
      setIsLoadingPdf(false); 
    }
  }, [pdfTitle]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      <header id="app-header" className="bg-white shadow-md sticky top-0 z-50">
        <link rel="icon" href="/favicon.ico" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div className="flex items-center">
                <img
                  src="images/logo.png"
                  alt="雅辑Markdown Logo"
                  className="h-8 w-auto"
                />
                <h1 className="text-2xl font-semibold text-sky-700">雅辑Markdown</h1>
            </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[calc(100vh-120px)]">
          <MarkdownInput
            id="markdown-input-container" 
            value={markdownText}
            onChange={handleMarkdownChange}
          />
          <MarkdownPreview
            htmlContent={htmlContent}
            pdfTitle={pdfTitle}
            onPdfTitleChange={handlePdfTitleChange}
            onExportPDF={handleExportPdf}
            isLoadingPdf={isLoadingPdf}
          />
        </div>
      </main>

      <footer id="app-footer" className="bg-white border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} 雅辑Markdown (Inkflow Markdown Editor). Crafted with care.</p>
      </footer>
    </div>
  );
};

export default App;