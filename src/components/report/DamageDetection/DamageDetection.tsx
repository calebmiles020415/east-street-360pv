// External Dependencies

import { Text, View } from '@react-pdf/renderer';
import { useContext } from 'react';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';
import { GalleryList } from '../../elements';
import { DataContext } from '../../PDFDocument';

export const DamageDetection: React.FunctionComponent = () => {
    const { imageGroupRawData, damageGalleryData } = useContext(DataContext!);
    if (
        (imageGroupRawData?.status !== 'completed' &&
            imageGroupRawData?.status !== 'partial_failure') ||
        !damageGalleryData?.length
    )
        return <></>;

    return (
        <View break>
            <Text
                style={{
                    ...tw('text-lg font-bold'),
                    color: textColors['foxy-section-header']
                }}
            >
                Damage Detection
            </Text>
            <GalleryList items={damageGalleryData} />
        </View>
    );
};
