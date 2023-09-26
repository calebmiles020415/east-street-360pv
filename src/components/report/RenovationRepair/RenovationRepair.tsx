// External Dependencies
import { Text, View } from '@react-pdf/renderer';
import { useContext } from 'react';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';
import { RenovationHeading } from '../../../components/elements';
import { formatCurrency } from '../../../lib/utils';
import { DataContext } from '../../PDFDocument';
import { RenovationAreaTable } from './';

export const RenovationRepair = () => {
    const { jsonData } = useContext(DataContext!);
    return (
        <View break>
            <Text
                style={{
                    ...tw('text-lg font-bold'),
                    color: textColors['foxy-section-header']
                }}
            >
                Renovation Estimate
            </Text>
            <View style={tw('flex flex-row gap-4 mt-4')}>
                <>
                    <View style={tw('w-1/2')}>
                        <RenovationHeading
                            title="Cost of Renovation Estimate:"
                            value={formatCurrency(
                                jsonData?.renovation?.estimateTotal,
                                jsonData?.avm?.valPro?.value
                            )}
                        />
                    </View>
                    <View style={tw('w-1/2')}>
                        <RenovationHeading
                            title="After Renovation Value:"
                            value={formatCurrency(
                                jsonData?.adjustedAvm?.foxyValPro?.foxyRenovationValPro?.value,
                                jsonData?.avm?.valPro?.value
                            )}
                        />
                    </View>
                </>
            </View>
            <RenovationAreaTable renovationAreaData={jsonData?.renovation?.areas} />
        </View>
    );
};
