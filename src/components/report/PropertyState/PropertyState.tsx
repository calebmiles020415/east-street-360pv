// External Dependencies
import { View, Text } from '@react-pdf/renderer';
import { useContext } from 'react';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';
import { DataContext } from '../../PDFDocument';
import { propertyDataTable } from '../PropertyDetails/MetaData';

export const PropertyState = () => {
    const { jsonData, pdfTemplate } = useContext(DataContext!);
    const { display, subComponents } = pdfTemplate?.templateSettings?.FIG || {};
    if (
        !display ||
        (jsonData?.avm?.status !== 'completed' && jsonData?.avm?.status !== 'partial_failure')
    )
        return <></>;

    return (
        <>
            <Text
                style={{
                    ...tw('text-lg font-bold mt-6'),
                    color: textColors['foxy-section-header']
                }}
            >
                Forecast, Insights & Growth
            </Text>
            <View style={tw('flex flex-row gap-4 mt-2')}>
                <View style={tw('w-1/2')}>{propertyDataTable(jsonData?.avm?.valPro)}</View>
                <View style={tw('w-1/2')}>{propertyDataTable(jsonData?.avm?.forecasts)}</View>
            </View>
        </>
    );
};
