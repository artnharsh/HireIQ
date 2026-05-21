import { Sparkles, BrainCircuit, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JobDetailModal = ({ job, onClose, onGenerateLetter, isGenerating }) => {
    const navigate = useNavigate();

    const handleAnalyze = () => {
        // Pass the JD text to the analysis page via React Router state
        navigate('/resume-analysis', { state: { jdText: job.description } });
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
                <div className="px-8 py-6 bg-sage-50/50 dark:bg-sage-950/50 border-b border-sage-100 dark:border-sage-800 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-sage-900 dark:text-sage-50 tracking-tight leading-tight">{job.title}</h2>
                        <p className="text-sage-500 dark:text-sage-400 mt-2 font-medium flex items-center gap-2">
                            <span className="bg-sage-200/50 dark:bg-sage-800/50 px-2.5 py-1 rounded-md text-xs font-bold text-sage-700 dark:text-sage-300">{job.company}</span> 
                            • {job.location.type}
                        </p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-sage-400 hover:text-sage-900 dark:hover:text-sage-50 rounded-full hover:bg-sage-200 dark:hover:bg-sage-800 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Scrollable Body */}
                <div className="p-8 overflow-y-auto space-y-8 flex-1 scrollbar-thin scrollbar-thumb-sage-200 dark:scrollbar-thumb-sage-700">
                    <div>
                        <h3 className="text-xs font-black mb-3 text-sage-400 dark:text-sage-500 uppercase tracking-widest">Description</h3>
                        <p className="text-sm md:text-base text-sage-700 dark:text-sage-300 leading-relaxed whitespace-pre-wrap font-medium">{job.description}</p>
                    </div>
                    
                    {job.requirements && (
                        <div>
                            <h3 className="text-xs font-black mb-3 text-sage-400 dark:text-sage-500 uppercase tracking-widest">Requirements</h3>
                            <p className="text-sm md:text-base text-sage-700 dark:text-sage-300 leading-relaxed whitespace-pre-wrap font-medium">{job.requirements}</p>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-sage-100 dark:border-sage-800 flex flex-col sm:flex-row justify-end gap-4 bg-sage-50/30 dark:bg-sage-950/30 backdrop-blur-sm">
                    <button 
                        onClick={handleAnalyze}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white dark:bg-sage-950 hover:bg-sage-50 dark:hover:bg-sage-800 text-sage-900 dark:text-sage-50 rounded-xl px-6 py-3 text-sm font-bold transition-colors border border-sage-200 dark:border-sage-700 shadow-sm"
                    >
                        <BrainCircuit className="w-5 h-5 text-sage-500"/> 
                        Analyze with My Resume
                    </button>
                    <button 
                        onClick={() => onGenerateLetter(job)}
                        disabled={isGenerating}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-sage-900 dark:bg-sage-100 hover:scale-105 disabled:hover:scale-100 disabled:opacity-50 text-sage-50 dark:text-sage-900 rounded-xl px-8 py-3 text-sm font-bold transition-all shadow-xl shadow-sage-900/10"
                    >
                        {isGenerating ? 'Generating via AI...' : <><Sparkles className="w-5 h-5"/> Generate Cover Letter</>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default JobDetailModal;