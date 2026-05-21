import { motion } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { Plus, Minus } from 'lucide-react';

const SkillGapReport = () => {
    const { currentAnalysis } = useResumeStore();
    if (!currentAnalysis) return null;

    const { strengths, weaknesses } = currentAnalysis.analysis;

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            
            {/* Strengths Panel */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/60 dark:bg-sage-900/40 backdrop-blur-sm border border-sage-200 dark:border-sage-800 rounded-[2rem] p-8 md:p-10 shadow-sm"
            >
                <h3 className="text-xl font-black mb-8 text-sage-900 dark:text-sage-50 tracking-tight">Core Strengths</h3>
                <motion.ul initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }} className="space-y-5">
                    {strengths.map((str, i) => (
                        <motion.li key={i} variants={itemVariants} className="flex items-start gap-4 group">
                            <div className="mt-0.5 p-1 rounded-md bg-sage-100 dark:bg-sage-800 text-sage-900 dark:text-sage-50">
                                <Plus className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm md:text-base font-medium text-sage-700 dark:text-sage-300 leading-relaxed">
                                {str}
                            </span>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>

            {/* Weaknesses Panel */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/30 dark:bg-sage-900/20 backdrop-blur-sm border border-dashed border-sage-300 dark:border-sage-700 rounded-[2rem] p-8 md:p-10 shadow-sm"
            >
                <h3 className="text-xl font-black mb-8 text-sage-900 dark:text-sage-50 tracking-tight">Identified Gaps</h3>
                <motion.ul initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }} className="space-y-5">
                    {weaknesses.map((wk, i) => (
                        <motion.li key={i} variants={itemVariants} className="flex items-start gap-4 group opacity-80 hover:opacity-100 transition-opacity">
                            <div className="mt-0.5 p-1 rounded-md bg-transparent border border-sage-300 dark:border-sage-700 text-sage-500">
                                <Minus className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm md:text-base font-medium text-sage-600 dark:text-sage-400 leading-relaxed">
                                {wk}
                            </span>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    );
};

export default SkillGapReport;