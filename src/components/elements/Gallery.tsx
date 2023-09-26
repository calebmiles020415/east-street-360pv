// External Dependencies
import { Image, View } from '@react-pdf/renderer';

// Internal Dependencies
import { tw } from '../../../styles/pdfStyle';
import { GalleryItem } from '../report';
import { Title } from './Title';

interface Props {
    item: GalleryItem;
}

export const Gallery = ({ item }: Props) => {
    const { mainPhoto, propertyType, conditionScore, qualityScore } = item;
    return (
        <View style={tw('flex flex-col w-[240px] items-center ')} wrap={false}>
            <Title
                type={propertyType}
                scores={
                    conditionScore && qualityScore
                        ? `(C${conditionScore?.toFixed(1)}, Q${qualityScore?.toFixed(1)})`
                        : ''
                }
            />
            <Image
                src={mainPhoto}
                style={tw('w-fill h-[204px] object-fill object-center rounded-b-sm')}
            />
        </View>
    );
};
