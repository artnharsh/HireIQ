const CandidateCluster = ({ session }) => {
    const clusters = {
        strong: session.results.filter(r => r.cluster === 'strong'),
        moderate: session.results.filter(r => r.cluster === 'moderate'),
        weak: session.results.filter(r => r.cluster === 'weak')
    };

    const Column = ({ title, color, candidates }) => (
        <div className="flex-1 min-w-[300px] bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col h-full">
            <div className={`p-4 border-b-2 ${color} bg-slate-900 rounded-t-xl flex justify-between items-center`}>
                <h3 className="font-bold text-slate-200">{title}</h3>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-400">{candidates.length}</span>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-700">
                {candidates.map((candidate, i) => (
                    <div key={i} className="bg-slate-950 p-4 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-sm text-slate-200 truncate pr-2" title={candidate.filename}>
                                {candidate.filename}
                            </h4>
                            <span className="text-xs font-bold text-slate-400">{Math.round(candidate.score)}%</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                            {candidate.matchedSkills.slice(0, 3).map(skill => (
                                <span key={skill} className="text-[9px] uppercase tracking-wider bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{skill}</span>
                            ))}
                            {candidate.matchedSkills.length > 3 && <span className="text-[9px] text-slate-500">+{candidate.matchedSkills.length - 3}</span>}
                        </div>
                    </div>
                ))}
                {candidates.length === 0 && (
                    <div className="text-center text-sm text-slate-600 py-8 border-2 border-dashed border-slate-800 rounded-lg">
                        No candidates in this tier
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex gap-6 overflow-x-auto pb-4">
            <Column title="Strong Match (70%+)" color="border-emerald-500" candidates={clusters.strong} />
            <Column title="Moderate Match (40-69%)" color="border-amber-500" candidates={clusters.moderate} />
            <Column title="Weak Match (<40%)" color="border-red-900/50" candidates={clusters.weak} />
        </div>
    );
};

export default CandidateCluster;