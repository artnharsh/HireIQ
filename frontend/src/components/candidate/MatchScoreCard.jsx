import { motion } from 'framer-motion';
import useResumeStore from '../../store/resumeStore';
import { Target } from 'lucide-react';

const MatchScoreCard = () => {
    const { currentAnalysis } = useResumeStore();
    if (!currentAnalysis) return null;

    const { score, analysis } = currentAnalysis;
    const { matched_skills = [], missing_skills = [], summary = '' } = analysis || {};

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 dark:bg-sage-900/50 backdrop-blur-xl border border-sage-200 dark:border-sage-800 rounded-[2rem] p-8 md:p-12 shadow-sm font-sans"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                
                {/* Left Side: Score & Summary */}
                <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                        <div className="p-3 rounded-2xl bg-sage-100 dark:bg-sage-800 border border-sage-200 dark:border-sage-700">
                            <Target className="w-6 h-6 text-sage-900 dark:text-sage-50" />
                        </div>
                        <h2 className="text-xl font-black text-sage-900 dark:text-sage-50 tracking-tight">Calibration Score</h2>
                    </div>
                    
                    <div className="mb-6">
                        <span className="text-8xl md:text-9xl font-black tracking-tighter leading-none text-sage-900 dark:text-sage-50">
                            {Math.round(score)}<span className="text-5xl md:text-6xl text-sage-300 dark:text-sage-700">%</span>
                        </span>
                    </div>
                    
                    <p className="text-sage-600 dark:text-sage-400 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                        {summary}
                    </p>
                </div>
                
                {/* Right Side: Skills Breakdown */}
                <div className="lg:col-span-7 flex flex-col justify-center gap-10 border-t lg:border-t-0 lg:border-l border-sage-200/60 dark:border-sage-800/60 pt-10 lg:pt-0 lg:pl-12">
                    
                    {/* Matched Skills (Solid, High Contrast) */}
                    <div>
                        <h3 className="text-[11px] font-black text-sage-400 dark:text-sage-500 uppercase tracking-widest mb-4">Acquired Competencies</h3>
                        {matched_skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {matched_skills.map(skill => (
                                    <span key={skill} className="px-3 py-1.5 bg-white dark:bg-sage-800 text-sage-900 dark:text-sage-50 border border-sage-200 dark:border-sage-700 text-xs font-bold rounded-lg shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm font-medium text-sage-500">No overlapping skills detected.</p>
                        )}
                    </div>

                    {/* Missing Skills (Dashed, Muted) */}
                    <div>
                        <h3 className="text-[11px] font-black text-sage-400 dark:text-sage-500 uppercase tracking-widest mb-4">Identified Gaps</h3>
                        {missing_skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {missing_skills.map(skill => (
                                    <span key={skill} className="px-3 py-1.5 bg-sage-50/50 dark:bg-sage-900/30 text-sage-500 dark:text-sage-400 border border-dashed border-sage-300 dark:border-sage-700 text-xs font-semibold rounded-lg">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm font-medium text-sage-500">No critical gaps identified.</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MatchScoreCard;