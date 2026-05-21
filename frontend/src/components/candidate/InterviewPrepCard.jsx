import { motion } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';

const InterviewPrepCard = () => {
    const { currentAnalysis } = useResumeStore();
    if (!currentAnalysis) return null;

    const { interview_questions } = currentAnalysis.analysis;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/80 dark:bg-sage-900/50 backdrop-blur-xl border border-sage-200 dark:border-sage-800 rounded-[2rem] p-8 md:p-10 shadow-sm h-full font-sans"
        >
            <h3 className="text-xl font-black mb-8 text-sage-900 dark:text-sage-50 tracking-tight">Interview Prep</h3>

            <div className="space-y-4">
                {interview_questions.map((q, i) => (
                    <div 
                        key={i} 
                        className="bg-sage-50/50 dark:bg-sage-950/50 p-6 rounded-2xl border border-sage-200/60 dark:border-sage-800/60 flex flex-col gap-4 items-start transition-all hover:bg-sage-100/50 dark:hover:bg-sage-900/80"
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-sage-300 dark:border-sage-700 text-sage-600 dark:text-sage-400">
                            {q.type}
                        </span>
                        <p className="text-sm md:text-base text-sage-900 dark:text-sage-50 font-semibold leading-relaxed">
                            {q.question}
                        </p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default InterviewPrepCard;