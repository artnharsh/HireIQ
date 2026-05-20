import { Sparkles, BrainCircuit, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDetailModal = ({ job, onClose, onGenerateLetter, isGenerating }) => {
    const navigate = useNavigate();

    const handleAnalyze = () => {
        // Pass the JD text to the analysis page via React Router state
        navigate('/resume-analysis', { state: { jdText: job.description } });
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
                
                <div className="p-6 border-b border-slate-800 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-50">{job.title}</h2>
                        <p className="text-slate-400 mt-1">{job.company} • {job.location.type}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6 flex-1">
                    <div>
                        <h3 className="font-semibold text-sm mb-2 text-slate-300 uppercase tracking-wider">Description</h3>
                        <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">{job.description}</p>
                    </div>
                    
                    {job.requirements && (
                        <div>
                            <h3 className="font-semibold text-sm mb-2 text-slate-300 uppercase tracking-wider">Requirements</h3>
                            <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">{job.requirements}</p>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-slate-800 flex flex-col sm:flex-row justify-end gap-4 bg-slate-900/50">
                    <button 
                        onClick={handleAnalyze}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors border border-slate-700"
                    >
                        <BrainCircuit className="w-4 h-4 text-indigo-400"/> 
                        Analyze with My Resume
                    </button>
                    <button 
                        onClick={() => onGenerateLetter(job)}
                        disabled={isGenerating}
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
                    >
                        {isGenerating ? 'Generating via AI...' : <><Sparkles className="w-4 h-4"/> Generate Cover Letter</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetailModal;