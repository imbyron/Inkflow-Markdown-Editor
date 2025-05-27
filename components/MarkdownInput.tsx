import React from 'react';

interface MarkdownInputProps {
  id?: string; // Added id prop
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownInput: React.FC<MarkdownInputProps> = ({ id, value, onChange }) => {
  return (
    <div id={id} className="flex flex-col bg-white rounded-lg shadow-lg h-full"> {/* Applied id prop here */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-medium text-slate-700">Markdown Input</h2>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your Markdown here..."
        className="flex-grow p-4 w-full h-full min-h-[25rem] resize-none border-none focus:ring-2 focus:ring-sky-500 focus:outline-none text-base leading-relaxed bg-transparent rounded-b-lg"
        spellCheck="false"
        aria-label="Markdown Input Area"
      />
    </div>
  );
};