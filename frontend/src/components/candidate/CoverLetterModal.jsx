import { X, Copy, Check, Download } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
            {/* Animated Blur Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-sage-900/20 dark:bg-black/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="bg-white dark:bg-sage-900 border border-sage-200/50 dark:border-sage-700/50 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative z-10 overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 bg-sage-50/50 dark:bg-sage-950/50 border-b border-sage-100 dark:border-sage-800">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-sage-900 dark:text-sage-50 tracking-tight">Generated Cover Letter</h2>
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-widest">Tailored specifically to your resume.</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-sage-400 hover:text-sage-900 dark:hover:text-sage-50 rounded-full hover:bg-sage-200 dark:hover:bg-sage-800 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Body (Editable Textarea) */}
                <div className="p-8 overflow-y-auto">
                    <textarea 
                        className="w-full h-[400px] bg-sage-50/50 dark:bg-sage-950/50 border border-sage-200 dark:border-sage-700 rounded-2xl p-6 text-sm md:text-base font-medium text-sage-800 dark:text-sage-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-sage-400 dark:focus:ring-sage-600 resize-none transition-shadow shadow-inner"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-sage-100 dark:border-sage-800 flex justify-end gap-3 bg-sage-50/30 dark:bg-sage-950/30 backdrop-blur-sm">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2.5 text-sm font-bold text-sage-500 hover:text-sage-900 dark:hover:text-sage-50 transition-colors"
                    >
                        Discard
                    </button>
                    <button 
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-6 py-2.5 bg-sage-200 dark:bg-sage-800 hover:bg-sage-300 dark:hover:bg-sage-700 text-sage-900 dark:text-sage-50 rounded-xl text-sm font-bold transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy Text'}
                    </button>
                    <button 
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-8 py-2.5 bg-sage-900 dark:bg-sage-100 text-sage-50 dark:text-sage-900 rounded-xl text-sm font-bold transition-transform hover:scale-105 shadow-xl shadow-sage-900/10"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF/TXT
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default CoverLetterModal;