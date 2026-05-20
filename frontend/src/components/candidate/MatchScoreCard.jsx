import useResumeStore from '../../store/resumeStore';

const MatchScoreCard = () => {
    const { currentAnalysis } = useResumeStore();
    if (!currentAnalysis) return null;

    // Extract score from top level, and skills/summary from the nested analysis object
    const { score, analysis } = currentAnalysis;
    const { matched_skills = [], missing_skills = [], summary = '' } = analysis || {};

    const scoreColor = score >= 75 ? 'text-emerald-400' : score >= 41 ? 'text-amber-400' : 'text-red-400';

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">Match Score</h2>
                <p className="text-sm text-slate-400 max-w-md">{summary}</p>
            </div>
            
            <div className="flex flex-col items-center">
                <div className={`text-6xl font-black ${scoreColor}`}>
                    {Math.round(score)}%
                </div>
            </div>

            <div className="flex-1 w-full flex flex-col gap-3">
                <div>
                    <span className="text-xs font-semibold text-slate-500 tracking-wider">MATCHED SKILLS</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {matched_skills.map(skill => (
                            <span key={skill} className="px-2 py-0.5 bg-emerald-950/30 text-emerald-400 border border-emerald-900/50 text-[10px] rounded uppercase tracking-wider">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <span className="text-xs font-semibold text-slate-500 tracking-wider">MISSING SKILLS</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {missing_skills.map(skill => (
                            <span key={skill} className="px-2 py-0.5 bg-red-950/30 text-red-400 border border-red-900/50 text-[10px] rounded uppercase tracking-wider">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchScoreCard;