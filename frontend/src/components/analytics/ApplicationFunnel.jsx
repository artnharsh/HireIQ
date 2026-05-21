import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ApplicationFunnel = ({ data }) => {
    // Custom colors for funnel stages (from our sage palette to darker/lighter shades)
    const getStageColor = (index) => {
        const colors = ['#b6cdbd', '#a1bcab', '#8da898', '#789384', '#5c715e', '#3f5041'];
        return colors[index % colors.length];
    };

    if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-sage-500">No applications to track.</div>;

    return (
        <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} width={80} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#1e251f', color: '#fff' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getStageColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ApplicationFunnel;