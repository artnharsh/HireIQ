import { Download, FileText, ChevronDown, ChevronUp, ArrowUpDown, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import React from 'react';
import useRecruiter from '../../hooks/useRecruiter';

const ShortlistTable = ({ session }) => {
    const { downloadCSV } = useRecruiter();
    const [expandedRow, setExpandedRow] = useState(null);
    const [modalResume, setModalResume] = useState(null); // For the Parsed Resume Modal

    // Sorting State
    const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });

    const getScoreColor = (score) => {
        if (score >= 70) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
        if (score >= 40) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
        return 'text-red-400 bg-red-400/10 border-red-400/20';
    };

    const getRowBgColor = (score) => {
        if (score >= 70) return 'bg-emerald-900/5 hover:bg-emerald-900/20';
        if (score >= 40) return 'bg-amber-900/5 hover:bg-amber-900/20';
        return 'bg-red-900/5 hover:bg-red-900/20';
    };

    // Sorting Logic
    const sortedResults = useMemo(() => {
        let sortableItems = [...session.results];
        sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sortableItems;
    }, [session.results, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h3 className="font-bold text-lg">Ranked Shortlist</h3>
                <button
                    onClick={() => downloadCSV(session._id, session.jobTitle)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-md text-sm transition-colors"
                >
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-950 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500 cursor-pointer">
                            <th className="p-4 font-semibold text-center w-16">Rank</th>
                            {/* Changed 'Candidate' to 'Name' */}
                            <th className="p-4 font-semibold hover:text-slate-300" onClick={() => handleSort('filename')}>
                                <div className="flex items-center gap-1">Name <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="p-4 font-semibold text-center hover:text-slate-300" onClick={() => handleSort('score')}>
                                <div className="flex items-center justify-center gap-1">Score <ArrowUpDown className="w-3 h-3" /></div>
                            </th>
                            <th className="p-4 font-semibold">Matched Skills</th>
                            <th className="p-4 font-semibold">Missing Skills</th>
                            {/* Added 'Action' text */}
                            <th className="p-4 font-semibold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {sortedResults.map((candidate, index) => (
                            <React.Fragment key={candidate._id || index}>
                                <tr className={`border-b border-slate-800/50 transition-colors ${getRowBgColor(candidate.score)}`}>
                                    {/* Keep absolute rank based on score, not current sort position */}
                                    <td className="p-4 text-slate-300 font-bold text-center">
                                        #{session.results.findIndex(r => r.filename === candidate.filename) + 1}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-8 h-8 text-indigo-400 p-1.5 bg-indigo-400/10 rounded" />
                                            <div>
                                                <p className="text-sm font-semibold text-slate-200">{candidate.filename}</p>
                                                <button
                                                    onClick={() => setModalResume(candidate)}
                                                    className="text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline"
                                                >
                                                    View Full Resume
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(candidate.score)}`}>
                                            {Math.round(candidate.score)}%
                                        </span>
                                    </td>
                                    <td className="p-4 w-1/4">
                                        <div className="flex flex-wrap gap-1">
                                            {candidate.matchedSkills.slice(0, 4).map(skill => (
                                                <span key={skill} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{skill}</span>
                                            ))}
                                            {candidate.matchedSkills.length > 4 && <span className="text-[10px] text-slate-500">+{candidate.matchedSkills.length - 4}</span>}
                                        </div>
                                    </td>
                                    <td className="p-4 w-1/4">
                                        <div className="flex flex-wrap gap-1">
                                            {candidate.missingSkills.slice(0, 3).map(skill => (
                                                <span key={skill} className="text-[10px] bg-red-950/30 text-red-400 border border-red-900/50 px-2 py-0.5 rounded">{skill}</span>
                                            ))}
                                            {candidate.missingSkills.length > 3 && <span className="text-[10px] text-slate-500">+{candidate.missingSkills.length - 3}</span>}
                                            {candidate.missingSkills.length === 0 && <span className="text-[10px] text-slate-500">None</span>}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                                            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-md"
                                        >
                                            {expandedRow === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === index && (
                                    <tr className="bg-slate-950/50 border-l-2 border-indigo-500">
                                        <td colSpan="6" className="p-6">
                                            <div className="max-w-4xl">
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">AI Recruiter Summary</span>
                                                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                                                    {candidate.explanation || "No explanation generated."}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Parsed Resume Modal */}
            {modalResume && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <div>
                                <h2 className="text-xl font-bold">{modalResume.filename}</h2>
                                <div className="flex gap-4 mt-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getScoreColor(modalResume.score)}`}>
                                        Match: {Math.round(modalResume.score)}%
                                    </span>
                                    <a href={modalResume.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:underline flex items-center">
                                        Open Original PDF
                                    </a>
                                </div>
                            </div>
                            <button onClick={() => setModalResume(null)} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto bg-slate-950 flex-1">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Extracted Raw Text</h3>
                            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-mono text-[11px]">
                                    {modalResume.parsedText || "Raw text not available for this session."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShortlistTable;