import { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import useResumeStore from '../../store/resumeStore';
import useResume from '../../hooks/useResume';

const ResumeUploader = () => {
    const fileInputRef = useRef(null);
    const { resume } = useResumeStore();
    const { uploadResume, isLoading, error } = useResume();
    const [dragActive, setDragActive] = useState(false);

    const handleFile = (file) => {
        if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx'))) {
            uploadResume(file);
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">1. Upload Resume</h2>
            
            {!resume ? (
                <div 
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFile(e.dataTransfer.files[0]); }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        dragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 hover:border-slate-500'
                    }`}
                >
                    <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.docx" onChange={(e) => handleFile(e.target.files[0])} />
                    <UploadCloud className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-300 font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">PDF or DOCX (Max 5MB)</p>
                    {isLoading && <p className="text-indigo-400 mt-4 animate-pulse">Uploading and Parsing AI...</p>}
                    {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
                </div>
            ) : (
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-indigo-400" />
                            <div>
                                <p className="font-medium">{resume.fileName}</p>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-emerald-400" /> Parsed successfully
                                </p>
                            </div>
                        </div>
                        <button onClick={() => fileInputRef.current?.click()} className="text-xs text-indigo-400 hover:text-indigo-300">
                            Replace File
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.docx" onChange={(e) => handleFile(e.target.files[0])} />
                    </div>
                    
                    <div className="mt-4">
                        <p className="text-xs font-semibold text-slate-400 mb-2">EXTRACTED SKILLS</p>
                        <div className="flex flex-wrap gap-2">
                            {resume.extractedSkills.slice(0, 15).map(skill => (
                                <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700">
                                    {skill}
                                </span>
                            ))}
                            {resume.extractedSkills.length > 15 && (
                                <span className="px-2 py-1 bg-slate-800 text-slate-500 text-xs rounded-md">+{resume.extractedSkills.length - 15} more</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeUploader;