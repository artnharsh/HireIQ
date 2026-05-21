import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useResume from '../hooks/useResume';
import useResumeStore from '../store/resumeStore';
import ResumeUploader from '../components/candidate/ResumeUploader';
import JDPasteBox from '../components/candidate/JDPasteBox';
import MatchScoreCard from '../components/candidate/MatchScoreCard';
import SkillGapReport from '../components/candidate/SkillGapReport';
import BulletSuggestions from '../components/candidate/BulletSuggestions';
import InterviewPrepCard from '../components/candidate/InterviewPrepCard';
import { BrainCircuit } from 'lucide-react';

const ResumeAnalysis = () => {
    const { fetchMyResume } = useResume();
    const { currentAnalysis } = useResumeStore();

    useEffect(() => {
        fetchMyResume();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-sage-50 dark:bg-sage-950 font-sans selection:bg-sage-300/50 flex flex-col">
            
            {/* The Command Hero (Adaptive based on analysis state) */}
            <motion.div 
                layout
                className={`w-full flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-sage-100/40 via-sage-50/10 to-transparent dark:from-sage-900/30 dark:via-sage-950/10 transition-all duration-700 ${currentAnalysis ? 'pt-12 pb-8' : 'pt-24 pb-16'}`}
            >
                <motion.div layout className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-200/50 dark:bg-sage-800/50 text-sage-700 dark:text-sage-300 text-xs font-black uppercase tracking-widest mb-6 border border-sage-300/50 dark:border-sage-700/50 shadow-sm">
                    <BrainCircuit className="w-3.5 h-3.5" /> Intelligence Engine
                </motion.div>
                
                <motion.h1 layout className={`font-black text-sage-900 dark:text-sage-50 tracking-tighter transition-all duration-700 ${currentAnalysis ? 'text-4xl md:text-5xl mb-4' : 'text-5xl md:text-7xl mb-6'}`}>
                    Resume <span className="italic text-sage-500 dark:text-sage-400 font-serif font-light">Analysis.</span>
                </motion.h1>
                
                <AnimatePresence>
                    {!currentAnalysis && (
                        <motion.p 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="text-lg text-sage-700/70 dark:text-sage-300/70 font-medium max-w-2xl mx-auto"
                        >
                            Calibrate your resume against specific job requirements using deep neural matching.
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* The Main Workspace */}
            <div className="max-w-[1400px] w-full mx-auto px-6 pb-24 flex-1 flex flex-col items-center">
                
                <AnimatePresence mode="wait">
                    {!currentAnalysis ? (
                        // STATE 1: Centered Focus Mode (Before Analysis)
                        <motion.div 
                            key="input-mode"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}
                            className="w-full max-w-3xl flex flex-col gap-8 mt-4"
                        >
                            <div className="bg-white/80 dark:bg-sage-900/50 backdrop-blur-xl border border-sage-200 dark:border-sage-800 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-sage-200/20 dark:shadow-none">
                                <ResumeUploader />
                                <div className="h-px w-full bg-sage-200/60 dark:bg-sage-800/60 my-10 relative">
                                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white dark:bg-sage-900 px-4 text-xs font-black text-sage-400 uppercase tracking-widest">Step 2</span>
                                </div>
                                <JDPasteBox />
                            </div>
                        </motion.div>
                    ) : (
                        // STATE 2: Expanded Dashboard Mode (After Analysis)
                        <motion.div 
                            key="analysis-mode"
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 mt-4"
                        >
                            {/* Left Column: Inputs shift to the side as a sticky reference */}
                            <div className="xl:col-span-4 shrink-0">
                                <div className="sticky top-28 space-y-6">
                                    <div className="bg-white/50 dark:bg-sage-950/50 backdrop-blur-md border border-sage-200 dark:border-sage-800 rounded-3xl p-6 shadow-sm">
                                        <ResumeUploader />
                                    </div>
                                    <div className="bg-white/50 dark:bg-sage-950/50 backdrop-blur-md border border-sage-200 dark:border-sage-800 rounded-3xl p-6 shadow-sm">
                                        <JDPasteBox compact /> 
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: The immersive analysis results */}
                            <div className="xl:col-span-8 flex flex-col gap-8">
                                <MatchScoreCard />
                                <SkillGapReport />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <BulletSuggestions />
                                    <InterviewPrepCard />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ResumeAnalysis;