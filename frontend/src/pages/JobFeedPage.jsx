import { useEffect, useState } from 'react';
import useJobStore from '../store/jobStore';
import useJobs from '../hooks/useJobs';
import FilterSidebar from '../components/jobs/FilterSidebar';
import JobCard from '../components/jobs/JobCard';
import JobDetailModal from '../components/jobs/JobDetailModal';
import CoverLetterModal from '../components/candidate/CoverLetterModal';
import { Search } from 'lucide-react';

const JobFeedPage = () => {
    const { jobs, filters, setFilters } = useJobStore();
    const { fetchJobs, generateCoverLetter, isGenerating, isLoading } = useJobs();
    const [selectedJob, setSelectedJob] = useState(null);
    const [generatedLetter, setGeneratedLetter] = useState(null);

    // Fetch jobs whenever filters change
    useEffect(() => {
        fetchJobs();
    }, [filters]);

    const handleGenerateLetter = async (job) => {
        const letter = await generateCoverLetter(job.description, job.company, job.title);
        if (letter) {
            setGeneratedLetter(letter);
            setSelectedJob(null); // Close detail modal if it was open
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Job Feed</h1>
                    <p className="text-slate-400 mt-1">Discover roles matched to your profile.</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search jobs, skills, or companies..." 
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
                        value={filters.search}
                        onChange={(e) => setFilters({ search: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                    <FilterSidebar />
                </div>
                
                <div className="lg:col-span-9">
                    {isLoading ? (
                        <div className="text-center py-20 text-slate-500">Loading jobs...</div>
                    ) : jobs.length > 0 ? (
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
                        <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-xl">
                            <h3 className="text-lg font-semibold text-slate-300">No jobs found</h3>
                            <p className="text-slate-500 text-sm mt-1">Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Detail View Modal (Now using the standalone component) */}
            {selectedJob && (
                <JobDetailModal 
                    job={selectedJob} 
                    onClose={() => setSelectedJob(null)} 
                    onGenerateLetter={handleGenerateLetter} 
                    isGenerating={isGenerating} 
                />
            )}

            {/* Render Cover Letter Modal if generated */}
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