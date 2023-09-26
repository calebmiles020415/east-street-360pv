// External Dependencies
import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';

// Internal Dependencies
import { RenovationHeading } from '../../elements';
import { MetaData } from './';
import { textColors, tw } from '../../../../styles/pdfStyle';
import { formatCurrency } from '../../../lib/utils';
import { DataContext } from '../../PDFDocument';

export const PropertyDetails = () => {
    const { jsonData, pdfTemplate } = useContext(DataContext!);
    const { display, subComponents } = pdfTemplate?.templateSettings?.property || {};

    if (!display) return <></>;

    return (
        <>
            <Text
                style={{
                    ...tw('text-lg font-bold '),
                    color: textColors['foxy-section-header']
                }}
            >
                {jsonData?.address}
            </Text>
            <View style={tw('flex flex-row gap-4 mt-4')}>
                <View style={tw('w-1/3')}>
                    {subComponents?.propCeve?.display && (
                        <RenovationHeading
                            title="Condition Enhanced"
                            subTitle="Valuation Estimate:"
                            value={formatCurrency(
                                jsonData?.adjustedAvm?.foxyValPro?.value,
                                jsonData?.avm?.valPro?.value
                            )}
                        />
                    )}
                </View>
                <View style={tw('w-1/3')}>
                    {subComponents?.propCre?.display && (
                        <RenovationHeading
                            title="Cost of"
                            subTitle="Renovation Estimate:"
                            value={formatCurrency(jsonData?.renovation?.estimateTotal)}
                        />
                    )}
                </View>
                <View style={tw('w-1/3')}>
                    {subComponents?.propArv?.display && (
                        <RenovationHeading
                            title="After"
                            subTitle="Renovation Value:"
                            value={formatCurrency(
                                jsonData?.adjustedAvm?.foxyValPro?.foxyRenovationValPro?.value,
                                jsonData?.avm?.valPro?.value
                            )}
                        />
                    )}
                </View>
            </View>
            <MetaData />
        </>
    );
};
