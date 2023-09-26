// External Dependencies
import { useContext } from 'react';
import { View, Image, Text } from '@react-pdf/renderer';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';
import { DataContext } from '../../PDFDocument';

export default function IndexTools() {
    const { jsonData, image } = useContext(DataContext!);

    if (jsonData?.avm?.status !== 'completed' && jsonData?.avm?.status !== 'partial_failure')
        return <></>;

    return (
        <View
            style={{
                ...tw(
                    'w-full bg-foxy-normal-light-gray mt-6 pt-[29px] pl-[18px] pr-6 pb-6 flex flex-row gap-[47px] rounded-sm'
                ),
                color: textColors['foxy-normal-light-gray']
            }}
            wrap={false}
        >
            <View style={tw('w-[220px] text-sm')}>
                <Text
                    style={{
                        ...tw('font-bold mt-[39px]'),
                        color: textColors['foxy-mid-green']
                    }}
                >
                    Index Tools - Valuation Changes
                </Text>
                <Text
                    style={{
                        ...tw('mt-4'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    The graph tracks the index of this property, its ZIP Code area, and its MSA over
                    time, showing the markets effect on each.
                </Text>
            </View>

            <View style={tw('w-[443px]')}>
                {!!image && (
                    <Image
                        src={image}
                        style={{
                            ...tw('w-full'),
                            height: 175
                        }}
                    />
                )}
                <Text
                    style={{
                        ...tw('text-[10px] leading-[14px] italic font-medium mt-[13px]'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    Note: The property index reflects the relative value of the subject home
                    compared to other points in time, not its value.
                </Text>
            </View>
        </View>
    );
}
