import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';
import useJobs from '../hooks/useJobs';
import { Clock, Bookmark, Send, Search, Users, Award, XCircle, Zap, Activity, Compass } from 'lucide-react';

const COLUMNS = {
    saved: { title: 'Saved', icon: <Bookmark className="w-4 h-4" /> },
    applied: { title: 'Applied', icon: <Send className="w-4 h-4" /> },
    screening: { title: 'Screening', icon: <Search className="w-4 h-4" /> },
    interview: { title: 'Interview', icon: <Users className="w-4 h-4" /> },
    offer: { title: 'Offer', icon: <Award className="w-4 h-4" /> },
    rejected: { title: 'Rejected', icon: <XCircle className="w-4 h-4" /> }
};

const ApplicationTrackerPage = () => {
    const [boardData, setBoardData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { updateApplicationStatus } = useJobs();

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setIsLoading(true);
            const res = await api.get('/applications/my');
            const apps = res.data.data;

            const initialData = Object.keys(COLUMNS).reduce((acc, key) => ({ ...acc, [key]: [] }), {});
            apps.forEach(app => {
                if (initialData[app.status]) initialData[app.status].push(app);
            });
            setBoardData(initialData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceCol = boardData[source.droppableId];
        const destCol = boardData[destination.droppableId];
        const itemMoved = sourceCol[source.index];

        const newSourceCol = Array.from(sourceCol);
        newSourceCol.splice(source.index, 1);

        const newDestCol = Array.from(destCol);
        newDestCol.splice(destination.index, 0, { ...itemMoved, status: destination.droppableId });

        setBoardData({
            ...boardData,
            [source.droppableId]: newSourceCol,
            [destination.droppableId]: newDestCol
        });

        updateApplicationStatus(itemMoved.jobId._id, destination.droppableId);
    };

    // Check if the entire board is empty
    const totalApps = Object.values(boardData).reduce((sum, col) => sum + col.length, 0);

    return (
        <div className="min-h-screen bg-sage-50 dark:bg-sage-950 font-sans flex flex-col selection:bg-sage-300/50">
            
            {/* 1. THE COMMAND HERO (Restored to match Job Feed & Resume Analysis) */}
            <div className="w-full flex flex-col items-center justify-center pt-16 pb-12 px-6 text-center border-b border-sage-200/40 dark:border-sage-800/40 bg-gradient-to-b from-sage-100/40 via-sage-50/10 to-transparent dark:from-sage-900/30 dark:via-sage-950/10 shrink-0">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-200/50 dark:bg-sage-800/50 text-sage-700 dark:text-sage-300 text-xs font-black uppercase tracking-widest mb-6 border border-sage-300/50 dark:border-sage-700/50 shadow-sm"
                >
                    <Activity className="w-3.5 h-3.5" /> Mission Control
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black text-sage-900 dark:text-sage-50 tracking-tighter mb-4"
                >
                    Pipeline <span className="italic text-sage-500 dark:text-sage-400 font-serif font-light">Tracker.</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="text-lg text-sage-600 dark:text-sage-400 font-medium max-w-xl mx-auto"
                >
                    Monitor and maneuver your active applications through the tactical hiring lifecycle.
                </motion.p>
            </div>

            {/* 2. THE MAIN BOARD AREA */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pt-12 pb-12 scrollbar-thin scrollbar-thumb-sage-300 dark:scrollbar-thumb-sage-700 px-6 lg:px-12 xl:px-20 relative">
                
                {!isLoading && totalApps === 0 ? (
                    // GLOBAL EMPTY STATE: If no jobs are saved at all
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto mt-10"
                    >
                        <div className="w-24 h-24 bg-white dark:bg-sage-900 rounded-full flex items-center justify-center mb-8 shadow-sm border border-sage-200 dark:border-sage-800">
                            <Compass className="w-10 h-10 text-sage-400 dark:text-sage-500" />
                        </div>
                        <h3 className="text-3xl font-black text-sage-900 dark:text-sage-50 mb-4 tracking-tight">Your pipeline is empty</h3>
                        <p className="text-sage-500 dark:text-sage-400 mb-10 text-lg font-medium">
                            Head over to the Job Feed to discover opportunities. Save or apply to roles to begin tracking them here.
                        </p>
                        <Link 
                            to="/jobs" 
                            className="px-10 py-4 bg-sage-900 dark:bg-sage-100 text-sage-50 dark:text-sage-900 font-black tracking-wide uppercase text-sm rounded-xl hover:scale-105 transition-transform shadow-xl shadow-sage-900/10"
                        >
                            Explore Roles
                        </Link>
                    </motion.div>
                ) : (
                    // THE PIPELINE TRACKS
                    <DragDropContext onDragEnd={onDragEnd}>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                            className="flex gap-8 h-full min-w-max items-start"
                        >
                            {Object.entries(COLUMNS).map(([columnId, columnDef], colIndex) => (
                                <div key={columnId} className="w-[320px] flex flex-col h-[calc(100vh-380px)] group">
                                    
                                    {/* Sleek, Floating Column Header */}
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-sage-200 dark:border-sage-800 relative">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white dark:bg-sage-900 border border-sage-200 dark:border-sage-700 rounded-lg text-sage-900 dark:text-sage-50 shadow-sm">
                                                {columnDef.icon}
                                            </div>
                                            <h3 className="text-sm font-black text-sage-900 dark:text-sage-50 uppercase tracking-widest">{columnDef.title}</h3>
                                        </div>
                                        <span className="text-sage-500 dark:text-sage-400 text-xs font-black">
                                            {boardData[columnId]?.length || 0}
                                        </span>
                                        {/* Connector line for the "Pipeline" feel */}
                                        {colIndex !== Object.keys(COLUMNS).length - 1 && (
                                            <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-sage-200 dark:bg-sage-800 -translate-y-1/2"></div>
                                        )}
                                    </div>

                                    {/* Transparent Droppable Zone (Only visible on hover/drag) */}
                                    <Droppable droppableId={columnId}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={`flex-1 overflow-y-auto scrollbar-none rounded-2xl p-2 transition-all duration-300 border-2 ${
                                                    snapshot.isDraggingOver 
                                                        ? 'bg-sage-100/50 dark:bg-sage-900/50 border-sage-300 dark:border-sage-600 border-dashed' 
                                                        : 'bg-transparent border-transparent'
                                                }`}
                                            >
                                                <div className="space-y-4">
                                                    {boardData[columnId]?.map((app, index) => (
                                                        <Draggable key={app._id} draggableId={app._id} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        ...provided.draggableProps.style,
                                                                        transform: snapshot.isDragging ? `${provided.draggableProps.style?.transform} rotate(3deg) scale(1.02)` : provided.draggableProps.style?.transform,
                                                                    }}
                                                                    className={`bg-white dark:bg-sage-900 p-5 rounded-2xl border transition-all duration-200 ${
                                                                        snapshot.isDragging 
                                                                            ? 'border-sage-900 dark:border-sage-50 shadow-2xl shadow-sage-900/20 dark:shadow-black/50 z-50' 
                                                                            : 'border-sage-200 dark:border-sage-800 shadow-sm hover:shadow-md hover:border-sage-400 dark:hover:border-sage-600'
                                                                    }`}
                                                                >
                                                                    {/* Card Header */}
                                                                    <div className="flex gap-3 items-start mb-4">
                                                                        <div className="w-10 h-10 shrink-0 bg-sage-50 dark:bg-sage-950 rounded-xl border border-sage-200 dark:border-sage-800 flex items-center justify-center font-black text-lg text-sage-900 dark:text-sage-50">
                                                                            {app.jobId.company.charAt(0)}
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-bold text-sage-900 dark:text-sage-50 leading-tight truncate w-[200px]">{app.jobId.title}</h4>
                                                                            <p className="text-xs font-medium text-sage-500 dark:text-sage-400 mt-1">{app.jobId.company}</p>
                                                                        </div>
                                                                    </div>

                                                                    {/* Tactical Seamless Notes Input */}
                                                                    <div className="mb-4">
                                                                        <textarea
                                                                            placeholder="Log tactical updates..."
                                                                            defaultValue={app.notes || ''}
                                                                            onBlur={(e) => {
                                                                                // api.patch(`/applications/${app._id}/notes`, { notes: e.target.value })
                                                                            }}
                                                                            className="w-full bg-sage-50/50 dark:bg-sage-950/30 border border-transparent hover:border-sage-200 dark:hover:border-sage-700 focus:border-sage-400 dark:focus:border-sage-600 focus:bg-white dark:focus:bg-sage-900 rounded-xl p-3 text-xs font-medium text-sage-700 dark:text-sage-300 focus:outline-none resize-none h-16 transition-all placeholder-sage-400"
                                                                        />
                                                                    </div>

                                                                    {/* Card Footer */}
                                                                    <div className="flex items-center justify-between pt-3 border-t border-sage-100 dark:border-sage-800">
                                                                        <span className="text-[10px] font-bold text-sage-400 dark:text-sage-500 flex items-center gap-1.5 uppercase tracking-wider">
                                                                            <Clock className="w-3 h-3" />
                                                                            {new Date(app.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                                        </span>
                                                                        {app.matchScore && (
                                                                            <span className="text-[10px] font-black flex items-center gap-1 text-sage-900 dark:text-sage-50 bg-sage-100 dark:bg-sage-800 px-2 py-1 rounded-md">
                                                                                <Zap className="w-3 h-3 text-sage-500" /> {Math.round(app.matchScore)}%
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            ))}
                        </motion.div>
                    </DragDropContext>
                )}
            </div>
        </div>
    );
};

export default ApplicationTrackerPage;