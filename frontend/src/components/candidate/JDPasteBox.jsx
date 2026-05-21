import { useState } from 'react';
import useResumeStore from '../../store/resumeStore';
import useResume from '../../hooks/useResume';
import { Sparkles, Loader2 } from 'lucide-react';

const JDPasteBox = ({ compact = false }) => {
    const [jdText, setJdText] = useState('');
    const { resume } = useResumeStore();
    const { analyzeWithJD, isLoading, error } = useResume();

    const handleAnalyze = () => {
        if (jdText.trim() && resume) {
            analyzeWithJD(jdText);
        }
    };

    return (
        <div className="w-full font-sans">
            {!compact && (
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-sage-200 dark:bg-sage-800 flex items-center justify-center font-black text-sm text-sage-900 dark:text-sage-50">2</div>
                    <h2 className="text-xl font-black text-sage-900 dark:text-sage-50 tracking-tight">Target Role</h2>
                </div>
            )}
            
            {compact && (
                <p className="text-[10px] font-black text-sage-400 uppercase tracking-widest mb-3">Target Job Description</p>
            )}

            <div className="relative group">
                <textarea
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder="Paste the target job description here. Include responsibilities and requirements..."
                    className={`w-full bg-sage-50/50 dark:bg-sage-950/50 border border-sage-200 dark:border-sage-800 rounded-2xl p-5 text-sm md:text-base font-medium text-sage-900 dark:text-sage-50 leading-relaxed focus:outline-none focus:ring-2 focus:ring-sage-400 dark:focus:ring-sage-600 resize-none transition-all placeholder-sage-400 dark:placeholder-sage-600 ${compact ? 'h-32' : 'h-56'}`}
                />
            </div>
            
            {error && <p className="text-red-500 text-sm font-bold mt-4 bg-red-50 dark:bg-red-500/10 px-4 py-2 rounded-lg">{error}</p>}
            
            <button
                disabled={!resume || !jdText.trim() || isLoading}
                onClick={handleAnalyze}
                className="w-full mt-6 py-4 flex items-center justify-center gap-2 bg-sage-900 dark:bg-sage-100 hover:bg-sage-800 dark:hover:bg-white disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed text-sage-50 dark:text-sage-900 rounded-xl font-bold text-lg transition-all shadow-xl shadow-sage-900/10 hover:scale-[1.02]"
            >
                {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Calibrating Match...</>
                ) : (
                    <><Sparkles className="w-5 h-5" /> Generate Intelligence</>
                )}
            </button>
            
            {!resume && (
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-4 text-center bg-amber-50 dark:bg-amber-900/20 py-2 rounded-lg">
                    Awaiting Resume Upload
                </p>
            )}
        </div>
    );
};

export default JDPasteBox;