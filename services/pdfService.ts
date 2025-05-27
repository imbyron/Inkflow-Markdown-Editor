// No need for jspdf or html2canvas declarations as they are no longer used.

export const exportToPdf = async (pdfTitleToUse: string): Promise<void> => {
  console.log("exportToPdf called with title:", pdfTitleToUse);
  const originalTitle = document.title;
  // Clean the title and ensure it's not empty. Browsers might use this for the default filename.
  const cleanTitle = pdfTitleToUse.toLowerCase().endsWith('.pdf') 
    ? pdfTitleToUse.slice(0, -4) 
    : pdfTitleToUse;
  document.title = cleanTitle || "document"; // Provide a fallback if cleanTitle is empty

  console.log("Attempting to call window.print(). Current document.title:", document.title);
  try {
    // Trigger the browser's print dialog
    window.print();
    console.log("window.print() was called. Dialog should be visible or have just closed.");
    
    // The print dialog is modal, but JavaScript execution continues.
    // We restore the title after a short delay.
    // This is an imperfect mechanism as there's no direct callback for when the print dialog closes.
    setTimeout(() => {
      console.log("Restoring original document title:", originalTitle);
      document.title = originalTitle;
    }, 500); // Restore title after 0.5 seconds.

    // Indicate success. The actual PDF generation is handled by the browser.
    return Promise.resolve();

  } catch (error) {
    // Catch any unexpected error during the window.print() call, though rare.
    console.error("Error directly during window.print() call:", error);
    document.title = originalTitle; // Ensure title is restored on error
    alert("无法打开打印对话框。请检查浏览器设置或控制台以获取更多信息。");
    return Promise.reject(error); // Re-throw to be caught by App.tsx
  }
};