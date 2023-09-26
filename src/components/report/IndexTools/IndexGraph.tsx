// External Dependencies
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import resolveConfig from 'tailwindcss/resolveConfig';

// Internal Dependencies
import myConfig from '../../../../tailwind.config';

import { IndexGraphItemType } from '../../../interface';

const tailwindConfig = resolveConfig(myConfig);
const tailwindColors = tailwindConfig.theme.colors;

interface Props {
    graphData: IndexGraphItemType[];
}

const CustomLegend = (props: any) => {
    const { iconSize, payload } = props;

    return (
        <ul className="flex justify-center gap-8">
            {payload.map((entry: any, index: number) => {
                if (entry.payload.legendType !== 'none')
                    return (
                        <li key={`item-${index}`}>
                            <div className="flex gap-2 items-center justify-center">
                                <div
                                    className="relative"
                                    style={{
                                        width: iconSize,
                                        height: iconSize,
                                        background: entry.color
                                    }}
                                ></div>
                                <p className="text-xs text-foxy-normal-dark-gray">{entry.value}</p>
                            </div>
                        </li>
                    );
            })}
        </ul>
    );
};

export default function IndexGraph({ graphData }: Props) {
    return (
        <>
            <div
                className="w-full m-auto rounded-xl py-16 mt-8"
                style={{ backgroundColor: '#D6DEDE' }}
            >
                <ResponsiveContainer width={'100%'} height={400} className="m-auto">
                    <LineChart
                        data={graphData}
                        className="flex flex-col-reverse gap-8"
                        margin={{ right: 30 }}
                    >
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={15}
                            interval="preserveStartEnd"
                            minTickGap={15}
                            stroke={tailwindColors['foxy-normal-dark-gray']}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={15}
                            stroke={tailwindColors['foxy-normal-dark-gray']}
                            domain={[0.5, 2]}
                        />
                        <CartesianGrid strokeDasharray="4 2" />
                        <Legend wrapperStyle={{ position: 'relative' }} content={CustomLegend} />
                        <Tooltip />
                        {graphData?.[0]?.Property && (
                            <Line
                                dataKey="Property"
                                stroke={tailwindColors['foxy-index-light-orange']}
                                strokeWidth={3}
                                isAnimationActive={false}
                                dot={false}
                            />
                        )}
                        {graphData?.[0]?.Zip && (
                            <Line
                                dataKey="Zip"
                                stroke={tailwindColors['foxy-index-light-green']}
                                strokeWidth={3}
                                isAnimationActive={false}
                                dot={false}
                            />
                        )}
                        {graphData?.[0]?.Metro && (
                            <Line
                                dataKey="Metro"
                                stroke={tailwindColors['foxy-index-light-blue']}
                                strokeWidth={3}
                                isAnimationActive={false}
                                dot={false}
                            />
                        )}
                        {graphData?.[0]?.County && (
                            <Line
                                dataKey="County"
                                stroke={tailwindColors['foxy-index-dark-blue']}
                                strokeWidth={3}
                                isAnimationActive={false}
                                dot={false}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="h-16 text-transparent">IndexGraph</div>
        </>
    );
}
