import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useJobStore from '../store/jobStore';
import useJobs from '../hooks/useJobs';
import FilterSidebar from '../components/jobs/FilterSidebar';
import JobCard from '../components/jobs/JobCard';
import JobDetailModal from '../components/jobs/JobDetailModal';
import CoverLetterModal from '../components/candidate/CoverLetterModal';
import JobCardSkeleton from '../components/jobs/JobCardSkeleton';
import { Search, SearchX, Sparkles } from 'lucide-react';

const JobFeedPage = () => {
    const { jobs, filters, setFilters } = useJobStore();
    const { fetchJobs, generateCoverLetter, isGenerating, isLoading } = useJobs();
    const [selectedJob, setSelectedJob] = useState(null);
    const [generatedLetter, setGeneratedLetter] = useState(null);

    const filterString = JSON.stringify(filters);
    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const handleGenerateLetter = async (job) => {
        const letter = await generateCoverLetter(job.description, job.company, job.title);
        if (letter) {
            setGeneratedLetter(letter);
            setSelectedJob(null);
        }
    };

    return (
        <div className="min-h-screen bg-sage-50 dark:bg-sage-950 font-sans selection:bg-sage-300/50 flex flex-col">
            
            {/* 1. THE COMMAND HERO - Removed the hard border, increased bottom padding */}
            <div className="w-full flex flex-col items-center justify-center pt-16 pb-16 px-6 text-center bg-gradient-to-b from-sage-100/40 via-sage-50/10 to-transparent dark:from-sage-900/30 dark:via-sage-950/10">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-200/50 dark:bg-sage-800/50 text-sage-700 dark:text-sage-300 text-xs font-black uppercase tracking-widest mb-8 border border-sage-300/50 dark:border-sage-700/50 shadow-sm"
                >
                    <Sparkles className="w-3.5 h-3.5" /> Active Pipeline
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-sage-900 dark:text-sage-50 tracking-tighter mb-10"
                >
                    Curated <span className="italic text-sage-500 dark:text-sage-400 font-serif font-light">Opportunities.</span>
                </motion.h1>
                
                {/* Massive Elevated Search Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="relative w-full max-w-2xl mx-auto group z-20"
                >
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-sage-400 transition-colors group-focus-within:text-sage-900 dark:group-focus-within:text-sage-50" />
                    <input 
                        type="text" 
                        placeholder="Search roles, skills, or companies..." 
                        className="w-full bg-white dark:bg-sage-900 border-2 border-transparent focus:border-sage-300 dark:focus:border-sage-700 rounded-full pl-16 pr-8 py-5 text-lg focus:outline-none transition-all text-sage-900 dark:text-sage-50 placeholder-sage-400 shadow-xl shadow-sage-200/40 dark:shadow-none font-medium"
                        value={filters.search || ''}
                        onChange={(e) => setFilters({ search: e.target.value })}
                    />
                </motion.div>
            </div>

            {/* 2. THE MAIN FEED - Switched to Fluid Flexbox Layout */}
            <div className="max-w-7xl w-full mx-auto px-6 pb-24 flex-1 flex flex-col">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 flex-1">
                    
                    {/* The Fixed-Width Sidebar (Prevents massive gaps on wide screens) */}
                    <div className="w-full lg:w-64 xl:w-72 shrink-0 hidden lg:block">
                        <div className="sticky top-28 h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin pr-4 pb-10">
                            <FilterSidebar />
                        </div>
                    </div>
                    
                    {/* The Main Content Area (Fills remaining space naturally) */}
                    <div className="flex-1 min-w-0 flex flex-col">
                        {isLoading ? (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(n => <JobCardSkeleton key={n} />)}
                            </div>
                        ) : jobs.length > 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="grid grid-cols-1 xl:grid-cols-2 gap-6"
                            >
                                <AnimatePresence mode="popLayout">
                                    {jobs.map(job => (
                                        <JobCard key={job._id} job={job} onOpenModal={() => setSelectedJob(job)} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            // The Anchored Empty State (Massive dashed container)
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                                className="flex-1 flex flex-col items-center justify-center text-center p-12 md:p-24 border-2 border-dashed border-sage-200 dark:border-sage-800 rounded-[2.5rem] bg-sage-50/50 dark:bg-sage-950/50"
                            >
                                <div className="w-24 h-24 bg-white dark:bg-sage-900 rounded-full flex items-center justify-center mb-8 shadow-sm border border-sage-100 dark:border-sage-800">
                                    <SearchX className="w-10 h-10 text-sage-400 dark:text-sage-500" />
                                </div>
                                <h3 className="text-3xl font-black text-sage-900 dark:text-sage-50 mb-3 tracking-tight">No matches found</h3>
                                <p className="text-sage-500 dark:text-sage-400 max-w-md mx-auto mb-10 text-lg font-medium">
                                    Your exact criteria didn't yield any results. Try broadening your landscape to discover more roles.
                                </p>
                                <button 
                                    onClick={() => setFilters({ search: '', type: [], experience: '', domain: '', mode: [] })} 
                                    className="px-8 py-3.5 bg-sage-900 dark:bg-sage-100 text-sage-50 dark:text-sage-900 font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-sage-900/10"
                                >
                                    Reset Filters
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedJob && <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} onGenerateLetter={handleGenerateLetter} isGenerating={isGenerating} />}
            </AnimatePresence>
            <AnimatePresence>
                {generatedLetter && <CoverLetterModal coverLetter={generatedLetter} onClose={() => setGeneratedLetter(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default JobFeedPage;