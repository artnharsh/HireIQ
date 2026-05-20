import { MapPin, Briefcase, Clock, Bookmark, Zap, DollarSign, Send } from 'lucide-react';
import useJobs from '../../hooks/useJobs';
import useResumeStore from '../../store/resumeStore'; // Added this import

const JobCard = ({ job, onOpenModal }) => {
    const { updateApplicationStatus } = useJobs();
    const { resume } = useResumeStore(); // Check if candidate has a resume

    const handleSave = (e) => {
        e.stopPropagation();
        updateApplicationStatus(job._id, 'saved');
    };

    return (
        <div
            onClick={() => onOpenModal(job)}
            className="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/5 group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center font-bold text-xl text-indigo-400">
                        {job.company.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                        <p className="text-sm text-slate-400">{job.company}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); updateApplicationStatus(job._id, 'applied'); }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md transition-colors flex items-center gap-1 shadow-sm"
                    >
                        <Send className="w-3 h-3" /> Quick Apply
                    </button>
                    <button onClick={handleSave} className="text-slate-500 hover:text-indigo-400 p-2">
                        <Bookmark className="w-5 h-5" />
                    </button>
                </div>
                <button onClick={handleSave} className="text-slate-500 hover:text-indigo-400 p-2">
                    <Bookmark className="w-5 h-5" />
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="flex items-center gap-1 text-xs bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800">
                    <MapPin className="w-3 h-3" /> {job.location.type} {job.location.city ? `- ${job.location.city}` : ''}
                </span>
                <span className="flex items-center gap-1 text-xs bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800 uppercase">
                    <Briefcase className="w-3 h-3" /> {job.type}
                </span>
                <span className="flex items-center gap-1 text-xs bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800">
                    <Clock className="w-3 h-3" /> {job.experienceLevel} yrs
                </span>
                {job.salary && (job.salary.min || job.salary.max) && (
                    <span className="flex items-center gap-1 text-xs bg-slate-950 px-2 py-1 rounded text-slate-300 border border-slate-800">
                        <DollarSign className="w-3 h-3 text-emerald-400" />
                        {job.salary.currency || 'USD'} {job.salary.min ? `${job.salary.min / 1000}k` : '0'} - {job.salary.max ? `${job.salary.max / 1000}k` : 'Uncapped'}
                    </span>
                )}

                {/* 🚨 Added the Match Score Badge here 🚨 */}
                {resume && (
                    <span className="flex items-center gap-1 text-xs bg-emerald-950/30 text-emerald-400 border border-emerald-900/50 px-2 py-1 rounded font-semibold ml-auto">
                        <Zap className="w-3 h-3" />
                        {/* We mock 'Calculate' here until you click into the modal to run the heavy AI task */}
                        Match: Click to Analyze
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-800/50">
                {job.skills.slice(0, 4).map(skill => (
                    <span key={skill} className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-950 px-2 py-1 rounded">
                        {skill}
                    </span>
                ))}
                {job.skills.length > 4 && <span className="text-[10px] text-slate-600 px-1 py-1">+{job.skills.length - 4}</span>}
            </div>
        </div>
    );
};

export default JobCard;