import { Link } from 'react-router-dom';
import { Briefcase, Users, Zap, PlusCircle, FileSearch, TrendingUp } from 'lucide-react';

const RecruiterDashboard = () => {
    // In a production app, these would be fetched via a /api/recruiter/stats endpoint
    const stats = [
        { title: 'Active Jobs', value: '3', icon: <Briefcase className="w-5 h-5 text-blue-400" /> },
        { title: 'Total Applicants', value: '142', icon: <Users className="w-5 h-5 text-indigo-400" /> },
        { title: 'Avg. Match Score', value: '68%', icon: <Zap className="w-5 h-5 text-emerald-400" /> }
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 animate-in fade-in duration-500">
            <div className="mb-8 border-b border-slate-800 pb-6">
                <h1 className="text-3xl font-bold tracking-tight">Recruiter Hub</h1>
                <p className="text-slate-400 mt-2">Manage your job postings and AI screening sessions.</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center justify-between group hover:border-slate-600 transition-colors">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">{stat.title}</p>
                            <p className="text-3xl font-black text-slate-200">{stat.value}</p>
                        </div>
                        <div className="p-4 bg-slate-950 rounded-full border border-slate-800 group-hover:scale-110 transition-transform">
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" /> Quick Actions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/recruiter/post-job" className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-8 group transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-indigo-500/20"></div>
                    <PlusCircle className="w-10 h-10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform relative z-10" />
                    <h3 className="text-xl font-bold mb-2 relative z-10">Post a New Job</h3>
                    <p className="text-slate-400 text-sm relative z-10">Create a multi-step job listing and publish it instantly to the candidate feed.</p>
                </Link>

                <Link to="/recruiter/bulk-screen" className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-8 group transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-emerald-500/20"></div>
                    <FileSearch className="w-10 h-10 text-emerald-400 mb-6 group-hover:scale-110 transition-transform relative z-10" />
                    <h3 className="text-xl font-bold mb-2 relative z-10">AI Bulk Screening</h3>
                    <p className="text-slate-400 text-sm relative z-10">Upload up to 50 resumes at once and let the AI rank them against your Job Description.</p>
                </Link>
            </div>
        </div>
    );
};

export default RecruiterDashboard;