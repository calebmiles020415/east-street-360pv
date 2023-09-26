// External Dependencies
import { View } from '@react-pdf/renderer';

// Internal Dependencies
import { tw } from '../../../styles/pdfStyle';
import { GalleryItem } from '../report';
import { Gallery } from '.';
interface Props {
    items?: GalleryItem[];
}

export const GalleryList = ({ items }: Props) => {
    return (
        <View
            style={tw(
                'flex flex-wrap flex-row justify-center my-auto items-center gap-4 mt-[10px]'
            )}
        >
            {items?.map((item, index) => (
                <Gallery item={item} key={index} />
            ))}
        </View>
    );
};
