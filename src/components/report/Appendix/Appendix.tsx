// External Dependencies
import { Text, View } from '@react-pdf/renderer';
import { useContext } from 'react';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';
import { DataContext } from '../../PDFDocument';
import { ImageList } from './ImageList';

export const Appendix: React.FunctionComponent = () => {
    const { galleryData, damageGalleryData } = useContext(DataContext!);
    if (!galleryData?.length && !damageGalleryData?.length) return <></>;

    return (
        <View break>
            <Text
                style={{
                    ...tw('text-lg font-bold'),
                    color: textColors['foxy-section-header']
                }}
            >
                Appendix
            </Text>
            <View style={tw('w-full flex flex-col gap-4 mt-6')}>
                {[...(galleryData || []), ...(damageGalleryData || [])]?.map((listData, index) => (
                    <ImageList listData={listData} key={index} />
                ))}
            </View>
        </View>
    );
};
