import { useState } from 'react';
import useResumeStore from '../../store/resumeStore';
import useResume from '../../hooks/useResume';

const JDPasteBox = () => {
    const [jdText, setJdText] = useState('');
    const { resume } = useResumeStore();
    const { analyzeWithJD, isLoading, error } = useResume();

    const handleAnalyze = () => {
        if (jdText.trim() && resume) {
            analyzeWithJD(jdText);
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">2. Paste Job Description</h2>
            <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the target job description here..."
                className="w-full h-48 px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
            />
            
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            
            <button
                disabled={!resume || !jdText.trim() || isLoading}
                onClick={handleAnalyze}
                className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
            >
                {isLoading ? 'Running AI Analysis...' : 'Analyze Match'}
            </button>
            
            {!resume && <p className="text-xs text-amber-500 mt-2 text-center">Upload a resume first to analyze.</p>}
        </div>
    );
};

export default JDPasteBox;