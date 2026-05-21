import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ScoreTimeline = ({ data }) => {
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-sage-50 dark:bg-sage-900 border border-sage-300 dark:border-sage-700 p-3 rounded-lg shadow-xl">
                    <p className="font-bold text-sage-900 dark:text-sage-50">{payload[0].payload.company}</p>
                    <p className="text-xs text-sage-500 mb-1">{payload[0].payload.date}</p>
                    <p className="text-sm font-bold text-emerald-500">Match Score: {payload[0].value}%</p>
                </div>
            );
        }
        return null;
    };

    if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-sage-500">Not enough screening data to plot timeline.</div>;

    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#5c715e" opacity={0.2} />
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="score" stroke="#5c715e" strokeWidth={3} dot={{ r: 4, fill: '#5c715e' }} activeDot={{ r: 6, fill: '#b6cdbd' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ScoreTimeline;