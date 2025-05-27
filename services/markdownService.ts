declare var marked: {
  parse: (markdownString: string, options?: object) => string | Promise<string>;
  setOptions: (options: object) => void;
};

declare var hljs: {
  highlightElement: (element: HTMLElement) => void;
  configure: (options: object) => void;
  getLanguage: (name: string) => any; 
  highlight: (code: string, options: { language: string, ignoreIllegals?: boolean }) => ({ value: string });
  // lineNumbersBlock removed from here
};

let markedInitialized = false;

const initializeMarked = () => {
  if (typeof marked !== 'undefined' && typeof hljs !== 'undefined' && !markedInitialized) {
    marked.setOptions({
      renderer: new (marked as any).Renderer(),
      highlight: (code: string, lang: string) => {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false, // Be cautious with this in broader applications
      smartypants: false,
      xhtml: false
    });
    markedInitialized = true;
  } else if (markedInitialized) {
    // Already initialized
    return;
  } else {
    console.warn("marked or hljs not available globally. Ensure they are loaded.");
  }
};


export const parseMarkdown = async (markdownText: string): Promise<string> => {
  initializeMarked();
  if (typeof marked === 'undefined') {
    return Promise.resolve("<p>Error: Markdown library not loaded.</p>");
  }
  try {
    // marked.parse can be async if options.async is true, but by default it's sync.
    // To be safe and align with potential future changes or complex highlighters:
    const html = await Promise.resolve(marked.parse(markdownText));
    return html as string;
  } catch (error) {
    console.error("Error parsing Markdown:", error);
    return Promise.resolve("<p>Error parsing Markdown content.</p>");
  }
};