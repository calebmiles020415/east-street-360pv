// External Dependencies
import { Image, Text, View } from '@react-pdf/renderer';
import React from 'react';

// Internal Dependencies
import { GalleryItem } from '../PropertyPhotos';
import { textColors, tw } from '../../../../styles/pdfStyle';

interface ImageListProps {
    listData: GalleryItem;
}

export const ImageList: React.FC<ImageListProps> = ({ listData }) => {
    return (
        <View
            wrap={false}
            style={tw(
                'rounded-sm h-[195px] pt-[13px] px-[15px] pb-[23px] bg-foxy-normal-light-gray w-full'
            )}
        >
            <Text
                style={{
                    ...tw('font-bold text-base leading-4'),
                    color: textColors['foxy-mid-green']
                }}
            >
                {`${listData.propertyType} (${listData?.subPhotos?.length})`}
            </Text>
            <View style={tw('w-full flex flex-row gap-[22px] mt-4')}>
                {listData?.subPhotos?.slice(0, 5)?.map((photo, index) => (
                    <Image
                        key={index}
                        source={photo}
                        style={tw('rounded-sm object-cover w-[126px] h-[126px]')}
                    />
                ))}
            </View>
        </View>
    );
};
