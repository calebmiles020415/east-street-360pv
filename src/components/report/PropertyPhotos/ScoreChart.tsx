import { View, Text, Svg, Polygon } from '@react-pdf/renderer';
import { useMediaQuery } from 'react-responsive';
import { textColors, tw } from '../../../../styles/pdfStyle';
import { ScoreItemType } from '../../../interface';

interface ScoreChartProps {
    data: ScoreItemType[];
    width: number;
    type: string;
}
export const ScoreChart = ({ data, width, type }: ScoreChartProps) => {
    const maxScore = 5;
    const xAxisWidth = width;
    const xAxisHeight = 30;
    const textWidth = xAxisWidth / 3;
    const barWidth = xAxisWidth - textWidth;
    const barItemWidth = barWidth / maxScore;
    const barItemHeight = 22;

    const getBackColor = (score: number) => {
        if (score >= 0 && score < 3) return textColors['foxy-mid-green'];
        if (score >= 3 && score < 5) return textColors['foxy-score-normal'];
        return textColors['foxy-score-damage'];
    };

    return (
        <View
            style={{
                ...tw(`bg-transparent flex flex-col gap-[3px] text-sm leading-[15px]`),
                width: width,
                color: textColors['foxy-obsidian-gray']
            }}
        >
            {data
                .map((item) => ({
                    ...item,
                    score: item.score < 1 ? 1 : item.score > 6 ? 6 : item.score
                }))
                .map((item) => (
                    <View
                        key={item.name + item.score}
                        style={tw('flex flex-row items-center gap-0')}
                    >
                        <Text style={{ width: textWidth }}>{item.name}</Text>
                        <View
                            style={{
                                ...tw(`rounded-[5px] pr-1 flex flex-row items-center`),
                                width: (barWidth * (maxScore - item.score + 1)) / maxScore,
                                height: barItemHeight,
                                backgroundColor: getBackColor(+item.score.toFixed(1))
                            }}
                        >
                            {item.score < 5.1 && (
                                <Text
                                    style={tw('w-full text-right font-bold text-white capitalize')}
                                >
                                    {type[0].toUpperCase()}
                                    {item.score.toFixed(1)}
                                </Text>
                            )}
                        </View>
                        {item.score >= 5.1 && (
                            <Text
                                style={{
                                    ...tw('text-right font-bold ml-2 capitalize'),
                                    color: textColors['foxy-obsidian-gray']
                                }}
                            >
                                {type[0].toUpperCase()}
                                {item.score.toFixed(1)}
                            </Text>
                        )}
                    </View>
                ))}
            <View style={{ ...tw('mt-[20px] flex flex-row'), marginLeft: textWidth }}>
                {[6, 5, 4, 3, 2, 1].map((axis, index) => (
                    <View
                        style={{
                            ...tw('flex flex-row'),
                            width: axis === 1 ? 1 : barItemWidth,
                            color: getBackColor(axis)
                        }}
                        key={`axis ${axis}`}
                    >
                        <View style={tw('w-1/2 flex flex-row')}>
                            <View
                                style={{
                                    ...tw(`w-0 h-[${xAxisHeight}px] border-solid border-l-[1px]`),
                                    borderColor: getBackColor(axis)
                                }}
                            />
                            <Text
                                style={{
                                    ...tw('absolute text-right'),
                                    marginLeft: -barItemWidth / 2
                                }}
                            >
                                {axis.toFixed(1)}
                            </Text>
                        </View>
                        {axis !== 1 && (
                            <View style={tw('flex flex-col justify-end w-1/2')}>
                                <View
                                    style={{
                                        ...tw(
                                            `w-0 h-[${
                                                xAxisHeight / 3
                                            }px] border-solid border-l-[1px]`
                                        ),
                                        height: xAxisHeight / 3,
                                        borderColor: getBackColor(axis - 0.5)
                                    }}
                                />
                            </View>
                        )}
                    </View>
                ))}
            </View>
            <View style={tw('flex flex-row w-full justify-between')}>
                <View
                    style={{
                        ...tw('flex flex-row text-[10px] leading-[15px] text-right'),
                        color: textColors['foxy-score-damage']
                    }}
                >
                    <Text style={{ ...tw('flex-grow'), width: textWidth - 10 }}>
                        {type === 'quality' ? 'Basic' : 'Heavy Damage'}
                    </Text>
                    <Svg width={10} style={tw('ml-[7px] mt-[3px]')}>
                        <Polygon
                            fill={textColors['foxy-score-damage']}
                            points="3.5,0.5 6.5,6.5 0.5,6.5"
                        />
                    </Svg>
                </View>
                <View
                    style={{
                        ...tw('flex flex-row text-[10px] leading-[15px] text-right'),
                        color: textColors['foxy-mid-green']
                    }}
                >
                    <Text style={{ ...tw('flex-grow'), width: textWidth - 10 }}>
                        {type === 'quality' ? 'Luxury' : 'Brand New'}
                    </Text>
                    <Svg width={10} style={tw('ml-[7px] mt-[3px] -mr-2')}>
                        <Polygon
                            fill={textColors['foxy-mid-green']}
                            points="3.5,0.5 6.5,6.5 0.5,6.5"
                        />
                    </Svg>
                </View>
            </View>
        </View>
    );
};
