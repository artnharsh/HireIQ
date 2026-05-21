import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecruiter from '../hooks/useRecruiter';
import { JOB_TYPES, EXPERIENCE_LEVELS, WORK_MODES, DOMAINS } from '../constants/filterOptions';

const PostJob = () => {
    const navigate = useNavigate();
    const { postJob, isLoading, error } = useRecruiter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '', company: '', type: 'Full-time', experienceLevel: '1-3', domain: 'Software Engineering',
        locationType: 'Remote', locationCity: '',
        minSalary: '', maxSalary: '', currency: 'USD',
        deadline: '',
        description: '', requirements: '', responsibilities: '', skills: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePublish = async () => {
        const payload = {
            ...formData,
            location: { type: formData.locationType.toLowerCase(), city: formData.locationCity },
            salary: { min: Number(formData.minSalary), max: Number(formData.maxSalary), currency: formData.currency },
            skills: formData.skills.split(',').map(s => s.trim()),
            type: formData.type.toLowerCase(),
            experienceLevel: formData.experienceLevel,
            deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null
        };

        const result = await postJob(payload);
        if (result) navigate('/dashboard'); // Or to a jobs management list
    };

    return (
        <div className="max-w-3xl mx-auto p-6 py-12">
            <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>

            <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 -z-10"></div>
                {[1, 2, 3, 4].map(num => (
                    <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= num ? 'bg-indigo-600 text-white' : 'bg-slate-900 border-2 border-slate-700 text-slate-500'}`}>
                        {num}
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl">
                
                {/* STEP 1: Basic info (title, company, type, location) */}
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in">
                        <h2 className="text-xl font-bold mb-4 text-indigo-400">Step 1: Basic Information</h2>
                        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded p-3 focus:outline-none focus:border-indigo-500 text-slate-200" />
                        <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded p-3 focus:outline-none focus:border-indigo-500 text-slate-200" />

                        <div className="grid grid-cols-2 gap-4">
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-slate-200">
                                {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <select name="domain" value={formData.domain} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-slate-200">
                                {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <select name="locationType" value={formData.locationType} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-slate-200">
                                {WORK_MODES.map(w => <option key={w} value={w}>{w}</option>)}
                            </select>
                            {formData.locationType !== 'Remote' && (
                                <input type="text" name="locationCity" placeholder="City (for Hybrid/Onsite)" value={formData.locationCity} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded p-3 focus:outline-none focus:border-indigo-500 text-slate-200" />
                            )}
                        </div>
                    </div>
                )}

                {/* STEP 2: Requirements (experience, skills, description) */}
                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in">
                        <h2 className="text-xl font-bold mb-4 text-indigo-400">Step 2: Requirements</h2>
                        
                        <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="w-full md:w-1/2 bg-slate-950 border border-slate-800 rounded p-3 text-slate-200 mb-2">
                            <option value="" disabled>Select Experience Level</option>
                            {EXPERIENCE_LEVELS.map(e => <option key={e} value={e}>{e} Experience</option>)}
                        </select>

                        <input type="text" name="skills" placeholder="Skills Required (comma separated, e.g. React, Node.js)" value={formData.skills} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded p-3 focus:outline-none focus:border-indigo-500 text-slate-200" />
                        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} className="w-full h-32 bg-slate-950 border border-slate-800 rounded p-3 focus:outline-none focus:border-indigo-500 resize-none text-slate-200" />
                        <textarea name="requirements" placeholder="Additional Requirements (Markdown/Bullets ok)" value={formData.requirements} onChange={handleChange} className="w-full h-24 bg-slate-950 border border-slate-800 rounded p-3 focus:outline-none focus:border-indigo-500 resize-none text-slate-200" />
                        <textarea name="responsibilities" placeholder="Responsibilities" value={formData.responsibilities} onChange={handleChange} className="w-full h-24 bg-slate-950 border border-slate-800 rounded p-3 focus:outline-none focus:border-indigo-500 resize-none text-slate-200" />
                    </div>
                )}

                {/* STEP 3: Compensation + deadline */}
                {step === 3 && (
                    <div className="space-y-4 animate-in fade-in">
                        <h2 className="text-xl font-bold mb-4 text-indigo-400">Step 3: Compensation & Logistics</h2>
                        
                        <label className="text-slate-400 text-sm block">Salary Range:</label>
                        <div className="flex items-center gap-4 mb-4">
                            <input type="number" name="minSalary" placeholder="Min" value={formData.minSalary} onChange={handleChange} className="w-1/3 bg-slate-950 border border-slate-800 rounded p-2 focus:outline-none text-slate-200" />
                            <span className="text-slate-500">-</span>
                            <input type="number" name="maxSalary" placeholder="Max" value={formData.maxSalary} onChange={handleChange} className="w-1/3 bg-slate-950 border border-slate-800 rounded p-2 focus:outline-none text-slate-200" />
                            <select name="currency" value={formData.currency} onChange={handleChange} className="w-24 bg-slate-950 border border-slate-800 rounded p-2 text-slate-200">
                                <option value="USD">USD</option>
                                <option value="INR">INR</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>

                        <div className="mt-6 border-t border-slate-800 pt-4">
                            <label className="text-slate-400 text-sm block mb-2">Application Deadline (Optional):</label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="w-full md:w-1/2 bg-slate-950 border border-slate-800 rounded p-3 focus:outline-none focus:border-indigo-500 text-slate-300"
                            />
                        </div>
                    </div>
                )}

                {/* STEP 4: Preview + Publish */}
                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in">
                        <h2 className="text-xl font-bold mb-4 text-emerald-400">Step 4: Review & Publish</h2>
                        <div className="bg-slate-950 p-6 rounded-lg border border-slate-800">
                            <h3 className="text-2xl font-bold">{formData.title}</h3>
                            <p className="text-slate-400 mb-4">{formData.company} • {formData.locationType} {formData.locationCity && `(${formData.locationCity})`}</p>

                            <div className="flex gap-2 mb-6">
                                <span className="bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded text-xs">{formData.type}</span>
                                <span className="bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded text-xs">{formData.experienceLevel} yrs</span>
                                <span className="bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded text-xs">${formData.minSalary} - ${formData.maxSalary}</span>
                                {formData.deadline && (
                                    <span className="bg-amber-900/50 text-amber-400 px-2 py-1 rounded text-xs">
                                        Deadline: {new Date(formData.deadline).toLocaleDateString()}
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-slate-300 whitespace-pre-wrap">{formData.description}</p>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                    </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t border-slate-800">
                    <button
                        onClick={() => setStep(step - 1)}
                        disabled={step === 1}
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-md text-sm font-medium transition-colors"
                    >
                        Back
                    </button>
                    {step < 4 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            onClick={handlePublish}
                            disabled={isLoading}
                            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-md text-sm font-bold transition-colors"
                        >
                            {isLoading ? 'Publishing...' : 'Publish Job Post'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostJob;