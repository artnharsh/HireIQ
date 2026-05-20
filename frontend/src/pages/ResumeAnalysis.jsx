import { useEffect } from 'react';
import useResume from '../hooks/useResume';
import useResumeStore from '../store/resumeStore';
import ResumeUploader from '../components/candidate/ResumeUploader';
import JDPasteBox from '../components/candidate/JDPasteBox';
import MatchScoreCard from '../components/candidate/MatchScoreCard';
import SkillGapReport from '../components/candidate/SkillGapReport';
import BulletSuggestions from '../components/candidate/BulletSuggestions';
import InterviewPrepCard from '../components/candidate/InterviewPrepCard';

const ResumeAnalysis = () => {
    const { fetchMyResume } = useResume();
    const { currentAnalysis } = useResumeStore();

    // Fetch existing resume on mount
    useEffect(() => {
        fetchMyResume();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            <div className="border-b border-slate-800 pb-6">
                <h1 className="text-3xl font-bold tracking-tight">Application Intelligence</h1>
                <p className="text-slate-400 mt-2">Upload your resume and a job description to get an AI-powered gap analysis.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-4 space-y-6">
                    <ResumeUploader />
                    <JDPasteBox />
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-8">
                    {currentAnalysis ? (
                        <div className="animate-in slide-in-from-bottom-4 duration-500">
                            <MatchScoreCard />
                            <SkillGapReport />
                            <BulletSuggestions />
                            <InterviewPrepCard />
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-800 rounded-xl p-12 text-center text-slate-500 bg-slate-900/50">
                            Upload a resume and paste a job description to see your tailored analysis here.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalysis;