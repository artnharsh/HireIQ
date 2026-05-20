import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import api from '../services/api';
import useJobs from '../hooks/useJobs';
import { Clock } from 'lucide-react';

const COLUMNS = {
    saved: { title: 'Saved', color: 'border-slate-700' },
    applied: { title: 'Applied', color: 'border-blue-800' },
    screening: { title: 'Screening', color: 'border-amber-800' },
    interview: { title: 'Interview', color: 'border-purple-800' },
    offer: { title: 'Offer', color: 'border-emerald-800' },
    rejected: { title: 'Rejected', color: 'border-red-900/50' }
};

const ApplicationTrackerPage = () => {
    const [boardData, setBoardData] = useState({});
    const { updateApplicationStatus } = useJobs();

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await api.get('/applications/my');
            const apps = res.data.data;

            // Organize into columns
            const initialData = Object.keys(COLUMNS).reduce((acc, key) => ({ ...acc, [key]: [] }), {});
            apps.forEach(app => {
                if (initialData[app.status]) initialData[app.status].push(app);
            });
            setBoardData(initialData);
        } catch (error) {
            console.error(error);
        }
    };

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        // Optimistic UI Update
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

        // Backend Update
        updateApplicationStatus(itemMoved.jobId._id, destination.droppableId);
    };

    return (
        <div className="max-w-[1400px] mx-auto p-6 h-[calc(100vh-80px)] flex flex-col">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Application Tracker</h1>
                <p className="text-slate-400 mt-1">Drag and drop to update your application status.</p>
            </div>

            <div className="flex-1 overflow-x-auto pb-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex gap-6 h-full min-w-max">
                        {Object.entries(COLUMNS).map(([columnId, columnDef]) => (
                            <div key={columnId} className="w-80 flex flex-col bg-slate-900/50 rounded-xl border border-slate-800">
                                <div className={`p-4 border-b-2 ${columnDef.color}`}>
                                    <h3 className="font-bold text-slate-200">{columnDef.title}</h3>
                                    <span className="text-xs text-slate-500">{boardData[columnId]?.length || 0} Jobs</span>
                                </div>

                                <Droppable droppableId={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`flex-1 p-3 space-y-3 overflow-y-auto transition-colors ${snapshot.isDraggingOver ? 'bg-slate-900/80' : ''
                                                }`}
                                        >
                                            {boardData[columnId]?.map((app, index) => (
                                                <Draggable key={app._id} draggableId={app._id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`bg-slate-950 p-4 rounded-lg border border-slate-700 shadow-sm ${snapshot.isDragging ? 'shadow-indigo-500/20 border-indigo-500' : 'hover:border-slate-500'
                                                                }`}
                                                        >
                                                            <h4 className="font-semibold text-sm text-slate-200 mb-1">{app.jobId.title}</h4>
                                                            <p className="text-xs text-slate-400 mb-3">{app.jobId.company}</p>

                                                            <div className="mt-3 mb-2">
                                                                <textarea
                                                                    placeholder="Add notes..."
                                                                    defaultValue={app.notes || ''}
                                                                    onBlur={(e) => {
                                                                        // In a real app, this would trigger an API call to update the notes
                                                                        // api.patch(`/applications/${app._id}/notes`, { notes: e.target.value })
                                                                    }}
                                                                    className="w-full bg-slate-900/50 border border-slate-800 rounded p-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 resize-none h-16"
                                                                />
                                                            </div>

                                                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
                                                                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {new Date(app.updatedAt).toLocaleDateString()}
                                                                </span>
                                                                {app.matchScore && (
                                                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded">
                                                                        {Math.round(app.matchScore)}% Match
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default ApplicationTrackerPage;