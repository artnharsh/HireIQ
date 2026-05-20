import useResumeStore from '../../store/resumeStore';
import { Lightbulb, Copy } from 'lucide-react';

const BulletSuggestions = () => {
    const { currentAnalysis } = useResumeStore();
    if (!currentAnalysis) return null;

    const { bullet_suggestions } = currentAnalysis.analysis;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // We will add toast notifications in Day 6, for now it just copies
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-400">
                <Lightbulb className="w-5 h-5" /> Resume Bullet Rewrites
            </h3>
            <div className="space-y-4">
                {bullet_suggestions.map((bullet, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800 relative group">
                        <div>
                            <span className="text-xs font-bold text-red-400 mb-1 block">CURRENT BULLET</span>
                            <p className="text-sm text-slate-400 line-through decoration-red-900/50">{bullet.before}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-emerald-400 mb-1 block">AI SUGGESTION (TAILORED FOR JD)</span>
                            <p className="text-sm text-slate-200">{bullet.after}</p>
                        </div>
                        <button 
                            onClick={() => copyToClipboard(bullet.after)}
                            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Copy suggestion"
                        >
                            <Copy className="w-4 h-4 text-slate-300" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BulletSuggestions;