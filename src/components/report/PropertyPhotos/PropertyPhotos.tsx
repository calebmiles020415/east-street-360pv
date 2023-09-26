// External Dependencies
import React, { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';

import { GalleryList } from '../../elements';
import { ScoreItemType } from '../../../interface';
import { DataContext } from '../../PDFDocument';
import { ScoreChart } from './ScoreChart';

export interface ScoreChartData {
    name: string;
    score: number;
}

export interface GalleryItem {
    propertyType: string;
    mainPhoto: string;
    subPhotos?: string[];
    conditionScore?: number;
    qualityScore?: number;
}

const BASIC_ORDER: any = {
    Overall: 5,
    Interior: 4,
    Exterior: 3,
    Kitchen: 2,
    Bathroom: 1
};

// parse score data for barchart from computedMetrics
export const getScoreData = (data: any, imageCounts = undefined) => {
    const scoreData: ScoreItemType[] = [];
    Object.keys(data).forEach((key) => {
        if (!imageCounts || imageCounts?.[key] !== 0)
            scoreData.push({
                name: key,
                score: data[key]
            });
    });
    scoreData.splice(-1);

    if (scoreData.length) {
        scoreData.unshift({
            name: 'Overall',
            score: data?.ImageGroupCondition || data?.ImageGroupQuality
        });

        // sort by basic order and alphabetical order
        scoreData.sort((a, b) => {
            if (BASIC_ORDER[a.name]) {
                if (BASIC_ORDER[b.name]) {
                    if (BASIC_ORDER[a.name] < BASIC_ORDER[b.name]) return 1;
                    return -1;
                }
                return -1;
            } else if (BASIC_ORDER[b.name]) return 1;
            if (a.name > b.name) return 1;
            return -1;
        });
    }
    return scoreData;
};

export const PropertyPhotos: React.FunctionComponent = () => {
    const { imageGroupRawData, galleryData, classCount } = useContext(DataContext!);
    if (
        imageGroupRawData?.status !== 'completed' &&
        imageGroupRawData?.status !== 'partial_failure'
    )
        return <></>;

    let conditionScore: ScoreItemType[] = [],
        qualityScore: ScoreItemType[] = [];

    const { condition, quality } = imageGroupRawData?.computedMetrics || {};
    if (!condition || !quality) return <></>;
    conditionScore = getScoreData(condition, classCount);
    qualityScore = getScoreData(quality, classCount);

    return (
        <>
            <View break wrap={false}>
                <Text
                    style={{
                        ...tw('text-lg font-bold'),
                        color: textColors['foxy-section-header']
                    }}
                >
                    FoxyAI Scores
                </Text>
                <View style={tw('flex flex-row gap-4 mt-[10px]')}>
                    <View style={tw('w-1/2')}>
                        <View style={tw('rounded-t-sm pt-[20px] px-4 bg-foxy-normal-light-gray')}>
                            <Text
                                style={{
                                    ...tw('font-bold text-base leading-4'),
                                    color: textColors['foxy-mid-green']
                                }}
                            >
                                FoxyAI Condition Score
                            </Text>
                            <Text
                                style={{
                                    ...tw('text-sm mt-[12px] h-[170px]'),
                                    color: textColors['foxy-obsidian-gray']
                                }}
                            >
                                The FoxyAI Condition Score is a proprietary model that analyzes your
                                property media and provides a continuous condition score using a
                                6-point scale ranging from Brand New to Heavy Damage/Not Livable.
                                This score is also based on the scoring system from the Uniform
                                Appraisal Dataset used by Fannie Mae, Freddie Mac and others, for
                                underwriting.
                            </Text>
                        </View>
                        <View
                            style={tw('rounded-b-sm pt-[45px] pb-[36px] px-[20px] bg-foxy-value')}
                        >
                            <ScoreChart data={conditionScore} width={328} type="condition" />
                        </View>
                    </View>
                    <View style={tw('w-1/2')}>
                        <View style={tw('rounded-t-sm pt-[20px] px-4 bg-foxy-normal-light-gray')}>
                            <Text
                                style={{
                                    ...tw('font-bold text-base leading-4'),
                                    color: textColors['foxy-mid-green']
                                }}
                            >
                                FoxyAI Quality Score
                            </Text>
                            <Text
                                style={{
                                    ...tw('text-sm mt-[12px] h-[170px]'),
                                    color: textColors['foxy-obsidian-gray']
                                }}
                            >
                                The FoxyAI Quality Score is a proprietary model that analyzes your
                                property photos and determines the quality of finishes, allowing for
                                easy organization, classification, and search. Using a continuous
                                6-point scale ranging from Luxury to Basic, this score is based on
                                the scoring system from the Uniform Appraisal Dataset.
                            </Text>
                        </View>
                        <View
                            style={tw('rounded-b-sm pt-[45px] pb-[36px] px-[20px] bg-foxy-value')}
                        >
                            <ScoreChart data={qualityScore} width={328} type="quality" />
                        </View>
                    </View>
                </View>
            </View>
            <View break>
                <Text
                    style={{
                        ...tw('text-lg font-bold'),
                        color: textColors['foxy-section-header']
                    }}
                >
                    Property Photos
                </Text>
                <GalleryList items={galleryData} />
            </View>
        </>
    );
};
