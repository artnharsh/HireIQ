import { useEffect, useState } from 'react';
import useJobStore from '../store/jobStore';
import useJobs from '../hooks/useJobs';
import FilterSidebar from '../components/jobs/FilterSidebar';
import JobCard from '../components/jobs/JobCard';
import JobDetailModal from '../components/jobs/JobDetailModal';
import CoverLetterModal from '../components/candidate/CoverLetterModal';
import JobCardSkeleton from '../components/jobs/JobCardSkeleton';
import { Search, SearchX } from 'lucide-react';

const JobFeedPage = () => {
    const { jobs, filters, setFilters } = useJobStore();
    const { fetchJobs, generateCoverLetter, isGenerating, isLoading } = useJobs();
    const [selectedJob, setSelectedJob] = useState(null);
    const [generatedLetter, setGeneratedLetter] = useState(null);

    // Fetch jobs whenever filters change
    const filterString = JSON.stringify(filters);
    useEffect(() => {
        fetchJobs();
    }, [filterString]);

    const handleGenerateLetter = async (job) => {
        const letter = await generateCoverLetter(job.description, job.company, job.title);
        if (letter) {
            setGeneratedLetter(letter);
            setSelectedJob(null); // Close detail modal if it was open
        }
    };

    const handleClearFilters = () => {
        // Resetting the main filters object back to defaults
        setFilters({ search: '', type: [], experience: '', domain: '', mode: [] });
    };

    return (
        <div className="max-w-7xl mx-auto p-6 animate-in fade-in duration-500">
            {/* Premium Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-sage-900 dark:text-sage-50">Job Feed</h1>
                    <p className="text-sage-700/70 dark:text-sage-300/70 mt-1 font-medium">Discover roles matched to your profile.</p>
                </div>
                
                <div className="relative w-full md:w-[400px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage-400 dark:text-sage-500" />
                    <input 
                        type="text" 
                        placeholder="Search jobs, skills, or companies..." 
                        className="w-full bg-white dark:bg-sage-900 border border-sage-300/50 dark:border-sage-700/50 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sage-300 dark:focus:ring-sage-700 transition-all text-sage-900 dark:text-sage-50 placeholder-sage-400 shadow-sm"
                        value={filters.search || ''}
                        onChange={(e) => setFilters({ search: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-3">
                    <FilterSidebar />
                </div>
                
                {/* Main Feed */}
                <div className="lg:col-span-9">
                    {isLoading ? (
                        // PREMIUM SKELETON LOADERS
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4, 5, 6].map(n => <JobCardSkeleton key={n} />)}
                        </div>
                    ) : jobs.length > 0 ? (
                        // JOB CARDS GRID
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {jobs.map(job => (
                                <JobCard 
                                    key={job._id} 
                                    job={job} 
                                    onOpenModal={() => setSelectedJob(job)} 
                                />
                            ))}
                        </div>
                    ) : (
                        // PREMIUM EMPTY STATE
                        <div className="bg-white dark:bg-sage-950 border border-sage-300/50 dark:border-sage-700/50 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px] shadow-sm">
                            <div className="w-20 h-20 bg-sage-100 dark:bg-sage-900 rounded-full flex items-center justify-center mb-6">
                                <SearchX className="w-10 h-10 text-sage-400 dark:text-sage-500" />
                            </div>
                            <h3 className="text-xl font-bold text-sage-900 dark:text-sage-50 mb-2">No jobs found</h3>
                            <p className="text-sage-700/70 dark:text-sage-300/70 max-w-sm mx-auto mb-6">
                                We couldn't find any positions matching your exact filters. Try adjusting your search criteria or clearing them completely.
                            </p>
                            <button 
                                onClick={handleClearFilters} 
                                className="px-6 py-2.5 bg-sage-200 dark:bg-sage-800 text-sage-900 dark:text-sage-50 font-bold rounded-lg hover:bg-sage-300 dark:hover:bg-sage-700 transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {selectedJob && (
                <JobDetailModal 
                    job={selectedJob} 
                    onClose={() => setSelectedJob(null)} 
                    onGenerateLetter={handleGenerateLetter} 
                    isGenerating={isGenerating} 
                />
            )}

            {generatedLetter && (
                <CoverLetterModal 
                    coverLetter={generatedLetter} 
                    onClose={() => setGeneratedLetter(null)} 
                />
            )}
        </div>
    );
};

export default JobFeedPage;