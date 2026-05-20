import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const CoverLetterModal = ({ coverLetter, onClose }) => {
    const [copied, setCopied] = useState(false);
    const [content, setContent] = useState(coverLetter);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([content], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "Cover_Letter.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <div>
                        <h2 className="text-xl font-bold">Generated Cover Letter</h2>
                        <p className="text-xs text-emerald-400 mt-1">Tailored specifically to your resume and this JD.</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto">
                    <textarea 
                        className="w-full h-[400px] bg-slate-950 border border-slate-800 rounded-lg p-4 text-sm text-slate-300 leading-relaxed focus:outline-none focus:border-indigo-500 resize-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="p-6 border-t border-slate-800 flex justify-end gap-4 bg-slate-900/50">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white">
                        Close
                    </button>
                    <button 
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button 
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                        <Copy className="w-4 h-4" />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterModal;