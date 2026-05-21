import { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, BrainCircuit, X } from 'lucide-react';
import useRecruiter from '../hooks/useRecruiter';
import ShortlistTable from '../components/recruiter/ShortlistTable';
import CandidateCluster from '../components/recruiter/CandidateCluster';

const BulkScreening = () => {
    const { bulkScreen, isLoading, error } = useRecruiter();
    const fileInputRef = useRef(null);
    
    const [step, setStep] = useState(1);
    const [jdText, setJdText] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [files, setFiles] = useState([]);
    const [sessionData, setSessionData] = useState(null);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'cluster'

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
        if (selectedFiles.length + files.length > 50) {
            alert('Maximum 50 resumes allowed per batch.');
            return;
        }
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const startScreening = async () => {
        if (!jdText || files.length === 0) return;
        setStep(3); // Loading screen
        
        const result = await bulkScreen(jdText, jobTitle || 'Untitled Batch', files);
        if (result) {
            setSessionData(result);
            setStep(4); // Results screen
        } else {
            setStep(2); // Back to upload on error
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">AI Bulk Screening</h1>
                <p className="text-slate-400 mt-1">Upload up to 50 resumes and let AI rank them instantly.</p>
            </div>

            {/* Step 1 & 2: Setup */}
            {step < 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* JD Input */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h2 className="text-lg font-bold mb-4">1. Job Description</h2>
                        <input 
                            type="text" 
                            placeholder="Job Title (e.g. Senior Frontend Engineer)" 
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 mb-4"
                        />
                        <textarea 
                            placeholder="Paste the full job description and requirements here..."
                            value={jdText}
                            onChange={(e) => setJdText(e.target.value)}
                            className="w-full h-64 bg-slate-950 border border-slate-800 rounded-lg p-4 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                        />
                    </div>

                    {/* File Upload */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col">
                        <h2 className="text-lg font-bold mb-4 flex justify-between items-center">
                            <span>2. Resumes (PDF only)</span>
                            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">{files.length} / 50</span>
                        </h2>
                        
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900 hover:bg-indigo-500/5 rounded-lg p-8 text-center cursor-pointer transition-colors mb-4"
                        >
                            <input type="file" multiple accept=".pdf" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                            <UploadCloud className="w-10 h-10 mx-auto text-slate-500 mb-2" />
                            <p className="text-sm font-medium">Click to select files</p>
                            <p className="text-xs text-slate-500 mt-1">Select up to 50 PDFs simultaneously</p>
                        </div>

                        {files.length > 0 && (
                            <div className="flex-1 overflow-y-auto max-h-[150px] bg-slate-950 rounded border border-slate-800 p-2 space-y-1 mb-4 scrollbar-thin">
                                {files.map((file, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded border border-slate-800">
                                        <span className="truncate pr-4 text-slate-300">{file.name}</span>
                                        <button onClick={() => removeFile(i)} className="text-slate-500 hover:text-red-400"><X className="w-3 h-3"/></button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                        <button 
                            onClick={startScreening}
                            disabled={!jdText || files.length === 0}
                            className="mt-auto w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg font-semibold flex justify-center items-center gap-2 transition-colors"
                        >
                            <BrainCircuit className="w-5 h-5" /> Start AI Screening
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Loading */}
            {step === 3 && (
                <div className="h-[60vh] flex flex-col items-center justify-center space-y-6">
                    <div className="w-24 h-24 border-4 border-indigo-900 border-t-indigo-500 rounded-full animate-spin"></div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold animate-pulse">AI is parsing and ranking {files.length} resumes...</h2>
                        <p className="text-slate-400 mt-2">Extracting skills, computing vector similarity, and generating insights.</p>
                        <p className="text-xs text-amber-500 mt-4 bg-amber-500/10 inline-block px-3 py-1 rounded-full border border-amber-500/20">
                            Please don't close this window.
                        </p>
                    </div>
                </div>
            )}

            {/* Step 4: Results */}
            {step === 4 && sessionData && (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center bg-slate-900 border border-slate-800 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-emerald-400" />
                            <span className="font-semibold text-emerald-400">Successfully processed {sessionData.results.length} candidates</span>
                        </div>
                        <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                            <button 
                                onClick={() => setViewMode('table')} 
                                className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === 'table' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                Table View
                            </button>
                            <button 
                                onClick={() => setViewMode('cluster')} 
                                className={`px-4 py-1.5 text-sm rounded-md transition-colors ${viewMode === 'cluster' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                Cluster View
                            </button>
                        </div>
                    </div>

                    {viewMode === 'table' ? (
                        <ShortlistTable session={sessionData} />
                    ) : (
                        <CandidateCluster session={sessionData} />
                    )}

                    <div className="text-center pt-8">
                        <button onClick={() => { setStep(1); setFiles([]); setSessionData(null); }} className="text-indigo-400 hover:text-indigo-300 underline font-medium">
                            Run another screening batch
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkScreening;