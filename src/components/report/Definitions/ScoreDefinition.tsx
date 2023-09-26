// External Dependencies
import { Text, View } from '@react-pdf/renderer';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';

const valueScoreData = [
    {
        score: '<50',
        error: '23.9%'
    },
    {
        score: '50-60',
        error: '15.7%'
    },
    {
        score: '60-70',
        error: '11.8%'
    },
    {
        score: '70-80',
        error: '9.9%'
    },
    {
        score: '80-90',
        error: '8.2%'
    },
    {
        score: '90-100',
        error: '6.7%'
    }
];

const conditionScoreData = [
    {
        score: 'A',
        desc: 'House Value based on House Indexes and neighborhood analysis.'
    },
    {
        score: 'B',
        desc: 'House Value based on adjusting prior sale with House Index.'
    },
    {
        score: 'C',
        desc: 'House Value based on adjusting prior sale with Zip index.'
    },
    {
        score: 'D',
        desc: 'House value based on adjusting prior sale with County index.'
    },
    {
        score: 'E',
        desc: 'House Value based on adjusting prior sale with Metro index.'
    },
    {
        score: 'F',
        desc: 'House Value based on adjusting prior sale with State index.'
    }
];

export const ScoreDefinition: React.FC = () => {
    return (
        <View break>
            <Text
                style={{
                    ...tw('text-lg font-bold'),
                    color: textColors['foxy-section-header']
                }}
            >
                Definitions
            </Text>
            <View
                style={tw(
                    'bg-foxy-normal-light-gray pt-[20px] pl-[13px] pr-[23px] pb-[31px] mt-4 rounded-sm'
                )}
            >
                <Text
                    style={{
                        ...tw('font-bold text-base leading-4'),
                        color: textColors['foxy-mid-green']
                    }}
                >
                    Value Score
                </Text>
                <Text
                    style={{
                        ...tw('text-sm mt-4'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    Estimate of accuracy of IndexValue, between 50 and 100. Historical testing using
                    actual sales shows that the IndexValue for the properties with higher
                    ValueScores have a lower median percent error compared to properties with lower
                    scores. The median error of IndexValue as a function of value score is as
                    follows:
                </Text>
                <View
                    style={{
                        ...tw(
                            'rounded-t-sm border-[1px] border-solid px-4 py-[10px] flex flex-row text-white text-left text-sm leading-4 mt-6 bg-foxy-table-text'
                        ),
                        borderColor: textColors['foxy-table-text']
                    }}
                >
                    <Text style={tw('w-1/2 -mt-2')}>Value Score</Text>
                    <Text style={tw('w-1/2 -mt-2 px-4')}>median error</Text>
                </View>
                {valueScoreData.map((data, index) => (
                    <View
                        key={index}
                        style={{
                            ...tw('flex flex-row text-left text-sm leading-4'),
                            color: textColors['foxy-table-text']
                        }}
                    >
                        <View
                            style={{
                                ...tw(
                                    `-mt-2 w-1/2 border-[1px] border-t-[0px] border-r-[0px] border-solid px-4 py-[10px] ${
                                        index === valueScoreData.length - 1 && 'rounded-bl-sm'
                                    }`
                                ),
                                borderColor: textColors['foxy-table-text']
                            }}
                        >
                            <Text>{data.score}</Text>
                        </View>
                        <View
                            style={{
                                ...tw(
                                    `-mt-2 w-1/2 border-[1px] border-t-[0px] border-solid px-4 py-[10px] ${
                                        index === valueScoreData.length - 1 && 'rounded-br-sm'
                                    }`
                                ),
                                borderColor: textColors['foxy-table-text']
                            }}
                        >
                            <Text>{data.error}</Text>
                        </View>
                    </View>
                ))}
                <Text
                    style={{
                        ...tw('text-sm mt-4'),
                        color: textColors['foxy-table-text']
                    }}
                >
                    ValueScore is -1 if no neighborhood analysis was performed.
                </Text>
            </View>
            <View
                style={tw(
                    'bg-foxy-normal-light-gray pt-[20px] pl-[13px] pr-[23px] pb-[31px] mt-6 rounded-sm'
                )}
            >
                <Text
                    style={{
                        ...tw('font-bold text-base leading-4'),
                        color: textColors['foxy-mid-green']
                    }}
                >
                    Confidence Score
                </Text>
                <Text
                    style={{
                        ...tw('text-sm mt-6'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    Confidence Score of current indexed value in the Results:IndexValue field.
                </Text>
                <Text
                    style={{
                        ...tw('text-sm mt-8 font-bold'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    All values based on adjusting prior sales to the present.
                </Text>
                <View style={tw('flex flex-col mt-8 gap-4 text-sm leading-4')}>
                    {conditionScoreData.map((data, index) => (
                        <View style={tw('flex flex-row gap-3 items-center')} key={index}>
                            <Text
                                style={{
                                    ...tw(
                                        'bg-foxy-value rounded-sm text-center py-1 w-[67px] h-[27px] font-bold'
                                    ),
                                    color: textColors['foxy-table-text']
                                }}
                            >
                                {data.score}
                            </Text>
                            <Text
                                style={{
                                    ...tw('h-[27px] py-1'),
                                    color: textColors['foxy-table-text']
                                }}
                            >
                                {data.desc}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};
