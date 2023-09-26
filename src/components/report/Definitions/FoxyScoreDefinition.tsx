// External Dependencies
import { Text, View } from '@react-pdf/renderer';
import { toToastItem } from 'react-toastify/dist/utils';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';

interface FoxyScoreType {
    scoreTitle: string;
    desc: string;
    src: string;
    scores: { scoreTitle: string; details: string[] }[];
}

const conditionScoreData: FoxyScoreType = {
    scoreTitle: 'FoxyAI Condition Score',
    desc: 'Official definitions derived from the Uniform Appraisal Dataset:',
    src: 'bradfordsoftware.com/uad/UAD_Glossary.pdf',
    scores: [
        {
            scoreTitle: 'C1 - Brand New',
            details: [
                'Entire structure and all components are new',
                'House has no physical depreciation or damage'
            ]
        },
        {
            scoreTitle: 'C2 – Like New',
            details: [
                'All components are new or recently renovated',
                'Little or no physical depreciation or damage'
            ]
        },
        {
            scoreTitle: 'C3 – Light Damage',
            details: ['Well maintained; normal wear and tear', 'Mostly updated']
        },
        {
            scoreTitle: 'C4 – Medium Damage',
            details: [
                'Minor deferred maintenance',
                'Medium damage due to normal wear and tear',
                'Minimal repairs to mechanical systems and cosmetic repairs'
            ]
        },
        {
            scoreTitle: 'C5 – Significant Damage',
            details: [
                'Significant damage',
                'Obvious deferred maintenance',
                'Livability somewhat diminished due to condition'
            ]
        },
        {
            scoreTitle: 'C6 – Heavy Damage',
            details: [
                'Heavy damage',
                'Substantial deferred maintenance',
                'Structural integrity potentially compromised',
                'Not habitable'
            ]
        }
    ]
};

const qualityScoreData: FoxyScoreType = {
    scoreTitle: 'FoxyAI Quality Score',
    desc: 'Official definitions derived from the Uniform Appraisal Dataset:',
    src: 'bradfordsoftware.com/uad/UAD_Glossary.pdf',
    scores: [
        {
            scoreTitle: 'Q1 – Luxury',
            details: [
                'Unique structures with the highest quality design, materials, and craftsmanship',
                'Exceptionally high quality appliances, cabinets, flooring, and other features'
            ]
        },
        {
            scoreTitle: 'Q2 – Custom',
            details: [
                'Unique structures with high quality design, materials, and craftsmanship',
                'High-end appliances, cabinets, flooring, and other features'
            ]
        },
        {
            scoreTitle: 'Q3 – Semi-custom',
            details: [
                'Higher quality design, materials, and craftsmanship',
                'Upgraded from stock materials; entry level stainless steel appliances and stone countertops'
            ]
        },
        {
            scoreTitle: 'Q4 – Stock',
            details: [
                'Plain design and craftsmanship Builder grade materials and features',
                'Minimal upgrades'
            ]
        },
        {
            scoreTitle: 'Q5 – Economy',
            details: [
                'Plain design and craftsmanship',
                'Obvious deferred maintenance',
                'Inexpensive materials and features; no upgrades'
            ]
        },
        {
            scoreTitle: 'Q6 – Basic',
            details: [
                'Simple design and potentially unskilled construction labor',
                'Lowest quality building materials',
                'Potentially not suitable for year around occupancy'
            ]
        }
    ]
};

interface FoxyScoreProps {
    data: FoxyScoreType;
}
const FoxyScore: React.FC<FoxyScoreProps> = ({ data }) => {
    return (
        <View
            style={tw(
                'bg-foxy-normal-light-gray pt-[20px] pl-[13px] pr-[23px] pb-6 mt-4 rounded-sm mb-4'
            )}
        >
            <Text
                style={{
                    ...tw('font-bold text-base leading-4'),
                    color: textColors['foxy-mid-green']
                }}
            >
                {data.scoreTitle}
            </Text>
            <View style={tw('flex flex-row gap-1 mt-3')}>
                <Text
                    style={{
                        ...tw('text-sm'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    {data.desc}
                </Text>
                <Text
                    style={{
                        ...tw('text-sm italic'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    {data.src}
                </Text>
            </View>
            <View
                style={{
                    ...tw('mt-6 flex flex-row flex-wrap w-full'),
                    color: textColors['foxy-table-text']
                }}
            >
                {data.scores.map((score, index) => (
                    <View key={index} style={{ ...tw('w-1/2 text-sm leading-[19px] mb-4') }}>
                        <Text style={tw('font-bold mb-2')}>{score.scoreTitle}</Text>
                        <View style={tw('flex flex-col gap-2 w-[96%]')}>
                            {score.details.map((detail, index) => (
                                <View style={tw('flex flex-row gap-3')} key={index}>
                                    <View
                                        style={tw(
                                            'rounded-full w-[5px] h-[5px] bg-foxy-table-text'
                                        )}
                                    />
                                    <Text style={tw('w-full -mt-2')}>{detail}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export const FoxyScoreDefinition: React.FC = () => {
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
            <FoxyScore data={conditionScoreData} />
            <FoxyScore data={qualityScoreData} />
        </View>
    );
};
