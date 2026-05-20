import useResumeStore from '../../store/resumeStore';
import { MessageSquare } from 'lucide-react';

const InterviewPrepCard = () => {
    const { currentAnalysis } = useResumeStore();
    if (!currentAnalysis) return null;

    const { interview_questions } = currentAnalysis.analysis;

    const getTypeColor = (type) => {
        if (type.toLowerCase().includes('technical')) return 'bg-blue-900/50 text-blue-300 border-blue-800';
        if (type.toLowerCase().includes('behavioral')) return 'bg-purple-900/50 text-purple-300 border-purple-800';
        return 'bg-indigo-900/50 text-indigo-300 border-indigo-800';
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" /> AI Interview Prep
            </h3>
            <div className="space-y-3">
                {interview_questions.map((q, i) => (
                    <div key={i} className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider whitespace-nowrap ${getTypeColor(q.type)}`}>
                            {q.type}
                        </span>
                        <p className="text-sm text-slate-200">{q.question}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterviewPrepCard;