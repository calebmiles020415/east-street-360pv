// External Dependencies
import { Image, View, Text, Svg } from '@react-pdf/renderer';
import { useContext } from 'react';
import * as Icons from '@heroicons/react/outline';

// Internal Dependencies
import { tw } from '../../../../styles/pdfStyle';
import { textColors } from '../../../../styles/pdfStyle';
import { DataContext } from '../../PDFDocument';
import { Value, FoxyValueStyle } from '../../elements/Value';
import { formatCurrency, formatNumber, normalizeText } from '../../../lib/utils';

const IMAGE_WIDTH = 240;
const IMAGE_HEIGHT = 216;

export const propertyDataTable = (
    data: any,
    height?: number,
    size: FoxyValueStyle = FoxyValueStyle.SIZE_3
) => {
    if (!Object.keys(data || {})?.length) return <></>;

    const getValue = (key: string) => {
        if (key === 'yearBuilt') return data[key];
        if (key === 'confidenceScore') return data[key];
        return key === 'value'
            ? formatCurrency(data[key])
            : key?.endsWith('Change') || key?.endsWith('Forecast')
            ? (key?.endsWith('Change') ? Number(data[key]) : Number(data[key]) * 100).toFixed(2) +
              '%'
            : formatNumber(data[key]);
    };

    return (
        <View
            style={tw(
                'bg-foxy-normal-light-gray px-4 py-[20px] flex flex-col gap-[20px] overflow-y-scroll text-sm leading-4 rounded-sm'
            )}
            wrap={false}
        >
            {Object.keys(data).map((key: string, index: number) => (
                <View
                    key={key}
                    style={{
                        ...tw(`w-full flex flex-row justify-between items-center`),
                        height,
                        color: textColors['foxy-normal-dark-gray']
                    }}
                >
                    <Text
                        style={{
                            ...tw('capitalize'),
                            color: textColors['foxy-table-text']
                        }}
                    >
                        {key === 'value' ? 'Weiss Analytics Valpro Est.' : normalizeText(key)}
                    </Text>
                    <View style={tw('flex flex-row gap-[6px] items-center')}>
                        <Value text={getValue(key)} size={size} />
                        {!height && (
                            <View style={tw('w-4 h-4')}>
                                {(key?.endsWith('Change') || key?.endsWith('Forecast')) &&
                                    (String(data[key]).startsWith('-') ? (
                                        <Image
                                            src="/images/down-red@2x.png"
                                            style={tw('w-4 h-4 object-cover')}
                                        />
                                    ) : (
                                        <Image
                                            src="/images/up-green@2x.png"
                                            style={tw('w-4 h-4 object-cover')}
                                        />
                                    ))}
                            </View>
                        )}
                    </View>
                </View>
            ))}
        </View>
    );
};

export const MetaData = () => {
    const { jsonData, pdfTemplate } = useContext(DataContext!);
    const { subComponents } = pdfTemplate?.templateSettings?.property || {};

    const propertyMetadata = { ...jsonData?.property };

    if (propertyMetadata) {
        if (propertyMetadata?._id) {
            delete propertyMetadata._id;
        }
        delete propertyMetadata.city;
        delete propertyMetadata.homeType;
        delete propertyMetadata.status;
        delete propertyMetadata.street;
    }

    return (
        <View style={tw('flex flex-row gap-4 mt-6 justify-between')}>
            <View style={tw('w-1/3')}>
                {subComponents?.propGmv?.display && (
                    <Image
                        src={`https://maps.googleapis.com/maps/api/staticmap?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&size=${IMAGE_WIDTH}x${IMAGE_HEIGHT}&center=${jsonData?.address}
                                    &markers=color:red%7C$${jsonData?.address}&zoom=15`}
                        style={tw('rounded-sm w-full h-[216px] object-fill object-center')}
                    />
                )}
            </View>
            <View style={tw('w-1/3')}>
                {subComponents?.propGsv?.display && (
                    <Image
                        src={`https://maps.googleapis.com/maps/api/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&size=${IMAGE_WIDTH}x${IMAGE_HEIGHT}&location=${jsonData?.address}`}
                        style={tw('rounded-sm w-full h-[216px] object-fill object-center')}
                    />
                )}
            </View>
            <View style={tw('w-1/3 h-[216px]')}>
                {subComponents?.propMeta?.display &&
                    !!propertyMetadata &&
                    propertyDataTable(
                        propertyMetadata,
                        IMAGE_HEIGHT / Object.keys(propertyMetadata).length,
                        FoxyValueStyle.SIZE_4
                    )}
            </View>
        </View>
    );
};
