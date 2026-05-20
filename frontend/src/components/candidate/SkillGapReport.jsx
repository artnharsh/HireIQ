import useResumeStore from '../../store/resumeStore';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const SkillGapReport = () => {
    const { currentAnalysis } = useResumeStore();
    if (!currentAnalysis) return null;

    const { strengths, weaknesses } = currentAnalysis.analysis;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" /> Your Strengths
                </h3>
                <ul className="space-y-3">
                    {strengths.map((str, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5">•</span> {str}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-5 h-5" /> Gaps & Weaknesses
                </h3>
                <ul className="space-y-3">
                    {weaknesses.map((wk, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">•</span> {wk}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SkillGapReport;