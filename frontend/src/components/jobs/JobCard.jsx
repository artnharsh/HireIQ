import { MapPin, Briefcase, Clock, Bookmark, Zap, DollarSign, Send } from 'lucide-react';
import useJobs from '../../hooks/useJobs';
import useResumeStore from '../../store/resumeStore';

const JobCard = ({ job, onOpenModal }) => {
    const { updateApplicationStatus } = useJobs();
    const { resume } = useResumeStore();

    const handleSave = (e) => {
        e.stopPropagation();
        updateApplicationStatus(job._id, 'saved');
    };

    return (
        <div
            onClick={() => onOpenModal(job)}
            className="bg-white dark:bg-sage-900/40 border border-sage-200 dark:border-sage-800 hover:border-sage-400 dark:hover:border-sage-500 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-sage-200/40 dark:hover:shadow-none hover:-translate-y-1 group relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-sage-50 dark:bg-sage-950 rounded-xl border border-sage-200 dark:border-sage-700 flex items-center justify-center font-black text-2xl text-sage-700 dark:text-sage-300 shadow-sm transition-transform group-hover:scale-105">
                        {job.company.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-sage-900 dark:text-sage-50 group-hover:text-sage-600 dark:group-hover:text-sage-300 transition-colors leading-tight">
                            {job.title}
                        </h3>
                        <p className="text-sm text-sage-500 dark:text-sage-400 font-medium mt-1">{job.company}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); updateApplicationStatus(job._id, 'applied'); }}
                        className="px-4 py-2 bg-sage-900 dark:bg-sage-100 hover:bg-sage-700 dark:hover:bg-white text-sage-50 dark:text-sage-900 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-sage-900/10"
                    >
                        <Send className="w-3.5 h-3.5" /> Apply
                    </button>
                    <button onClick={handleSave} className="text-sage-400 hover:text-sage-900 dark:text-sage-500 dark:hover:text-sage-50 p-2 transition-colors bg-sage-50 dark:bg-sage-950 hover:bg-sage-100 dark:hover:bg-sage-800 rounded-lg border border-sage-200 dark:border-sage-800">
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="flex items-center gap-1.5 text-xs bg-sage-50 dark:bg-sage-950/50 px-2.5 py-1.5 rounded-lg text-sage-700 dark:text-sage-300 border border-sage-200 dark:border-sage-800 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-sage-400" /> {job.location.type} {job.location.city ? `- ${job.location.city}` : ''}
                </span>
                <span className="flex items-center gap-1.5 text-xs bg-sage-50 dark:bg-sage-950/50 px-2.5 py-1.5 rounded-lg text-sage-700 dark:text-sage-300 border border-sage-200 dark:border-sage-800 font-medium uppercase tracking-wide">
                    <Briefcase className="w-3.5 h-3.5 text-sage-400" /> {job.type}
                </span>
                <span className="flex items-center gap-1.5 text-xs bg-sage-50 dark:bg-sage-950/50 px-2.5 py-1.5 rounded-lg text-sage-700 dark:text-sage-300 border border-sage-200 dark:border-sage-800 font-medium">
                    <Clock className="w-3.5 h-3.5 text-sage-400" /> {job.experienceLevel} yrs
                </span>
                {job.salary && (job.salary.min || job.salary.max) && (
                    <span className="flex items-center gap-1.5 text-xs bg-sage-50 dark:bg-sage-950/50 px-2.5 py-1.5 rounded-lg text-sage-700 dark:text-sage-300 border border-sage-200 dark:border-sage-800 font-medium">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                        {job.salary.currency || 'USD'} {job.salary.min ? `${job.salary.min / 1000}k` : '0'} - {job.salary.max ? `${job.salary.max / 1000}k` : 'Uncapped'}
                    </span>
                )}

                {/* Match Score Badge */}
                {resume && (
                    <span className="flex items-center gap-1 text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 px-2.5 py-1.5 rounded-lg font-bold ml-auto shadow-sm transition-all group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50">
                        <Zap className="w-3.5 h-3.5" />
                        Analyze Match
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-sage-100 dark:border-sage-800/50">
                {job.skills.slice(0, 4).map(skill => (
                    <span key={skill} className="text-[10px] uppercase tracking-widest font-bold text-sage-500 dark:text-sage-400 bg-sage-100/50 dark:bg-sage-900/50 border border-sage-200/50 dark:border-sage-700/50 px-2 py-1 rounded-md">
                        {skill}
                    </span>
                ))}
                {job.skills.length > 4 && <span className="text-[10px] font-bold text-sage-400 dark:text-sage-500 px-1 py-1">+{job.skills.length - 4}</span>}
            </div>
        </div>
    );
};

export default JobCard;