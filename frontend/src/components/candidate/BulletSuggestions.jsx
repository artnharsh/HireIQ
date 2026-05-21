import { useState } from 'react';
import { motion } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { Copy, Check, ArrowRight } from 'lucide-react';

const BulletSuggestions = () => {
    const { currentAnalysis } = useResumeStore();
    const [copiedIndex, setCopiedIndex] = useState(null);

    if (!currentAnalysis) return null;
    const { bullet_suggestions } = currentAnalysis.analysis;

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/80 dark:bg-sage-900/50 backdrop-blur-xl border border-sage-200 dark:border-sage-800 rounded-[2rem] p-8 md:p-10 shadow-sm h-full font-sans"
        >
            <h3 className="text-xl font-black mb-8 text-sage-900 dark:text-sage-50 tracking-tight">Bullet Optimization</h3>

            <div className="space-y-6">
                {bullet_suggestions.map((bullet, i) => (
                    <div key={i} className="bg-sage-50/50 dark:bg-sage-950/50 rounded-2xl p-6 border border-sage-200/60 dark:border-sage-800/60 relative group/card transition-colors hover:bg-sage-100/50 dark:hover:bg-sage-900/80">
                        
                        <button 
                            onClick={() => handleCopy(bullet.after, i)}
                            className="absolute top-4 right-4 p-2 bg-white dark:bg-sage-800 border border-sage-200 dark:border-sage-700 text-sage-900 dark:text-sage-50 rounded-lg opacity-0 group-hover/card:opacity-100 transition-all shadow-sm hover:scale-105"
                        >
                            {copiedIndex === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>

                        <div className="flex flex-col md:flex-row gap-6 pr-8">
                            {/* Original */}
                            <div className="flex-1 opacity-60">
                                <span className="text-[10px] font-black text-sage-500 block uppercase tracking-widest mb-3">Original</span>
                                <p className="text-sm font-medium text-sage-600 dark:text-sage-400 line-through decoration-sage-400 dark:decoration-sage-600 leading-relaxed">{bullet.before}</p>
                            </div>
                            
                            {/* Divider Arrow */}
                            <div className="hidden md:flex items-center justify-center shrink-0">
                                <ArrowRight className="w-5 h-5 text-sage-300 dark:text-sage-700" />
                            </div>

                            {/* Tailored */}
                            <div className="flex-1">
                                <span className="text-[10px] font-black text-sage-900 dark:text-sage-50 block uppercase tracking-widest mb-3">Tailored</span>
                                <p className="text-sm md:text-base font-bold text-sage-900 dark:text-sage-50 leading-relaxed">{bullet.after}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default BulletSuggestions;