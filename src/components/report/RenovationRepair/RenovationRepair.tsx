// External Dependencies
import { Text, View } from '@react-pdf/renderer';
import { useContext } from 'react';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';
import { RenovationHeading } from '../../../components/elements';
import { formatCurrency } from '../../../lib/utils';
import { DataContext } from '../../PDFDocument';
import { RenovationAreaTable } from './';
import { table } from 'console';

export const RenovationRepair = () => {
    const { jsonData } = useContext(DataContext!);
    let restSize: number = 744;
    const maxSize: number = 904;
    const normalTableMarginBottom: number = 50;

    const getTableSize = (length: number) => 85 + 40 * length;

    return (
        <View break>
            <Text
                style={{
                    ...tw('text-lg font-bold'),
                    color: textColors['foxy-section-header']
                }}
            >
                Repair Estimate
            </Text>
            <View style={tw('flex flex-row gap-4 mt-4')}>
                <>
                    <View style={tw('w-1/2')}>
                        <RenovationHeading
                            title="Cost of Repair Estimate:"
                            value={formatCurrency(
                                jsonData?.renovation?.estimateTotal,
                                jsonData?.avm?.valPro?.value
                            )}
                        />
                    </View>
                    <View style={tw('w-1/2')}>
                        <RenovationHeading
                            title="After Repair Value:"
                            value={formatCurrency(
                                jsonData?.adjustedAvm?.foxyValPro?.foxyRenovationValPro?.value,
                                jsonData?.avm?.valPro?.value
                            )}
                        />
                    </View>
                </>
            </View>
            {jsonData?.renovation?.areas?.map((tableData, index) => {
                const currentTableSize = getTableSize(
                    jsonData?.renovation?.areas?.[index]?.remodelProjects.length
                );
                const nextTableSize = getTableSize(
                    jsonData?.renovation?.areas?.[index + 1]?.remodelProjects.length
                );
                let marginBottomSize;
                restSize -= currentTableSize;
                while (restSize <= 0) {
                    restSize += maxSize;
                }
                console.log(restSize, nextTableSize);
                if (nextTableSize + normalTableMarginBottom <= restSize) {
                    marginBottomSize = normalTableMarginBottom;
                    restSize -= marginBottomSize;
                } else {
                    marginBottomSize = restSize;
                    restSize = maxSize;
                }
                return (
                    tableData.areaProjectCount && (
                        <RenovationAreaTable repairData={tableData} mbSize={marginBottomSize} />
                    )
                );
            })}
        </View>
    );
};
