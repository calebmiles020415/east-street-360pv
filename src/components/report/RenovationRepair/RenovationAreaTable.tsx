// External Dependencies
import { View, Text } from '@react-pdf/renderer';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';
import { AreaType } from '../../../interface';
import { formatCurrency, formatNumber, roundNumber } from '../../../lib/utils';

interface Props {
    renovationAreaData?: AreaType[];
}

export const RenovationAreaTable = ({ renovationAreaData }: Props) => {
    return (
        <View style={tw('mt-[20px] text-[13px] leading-4 text-white w-full text-center')}>
            <View
                style={tw(
                    'py-[12px] px-[14px] flex flex-row bg-foxy-table-text rounded-t-sm w-full justify-between h-[44px] border-none'
                )}
                wrap={false}
            >
                <Text style={tw('w-[410px] whitespace-nowrap font-bold text-left')}>Estimates</Text>
            </View>
            <View
                style={tw(
                    'flex flex-row bg-foxy-mid-green items-center px-4 py-[10px] gap-[40px] justify-between h-[39px] border-none'
                )}
                wrap={false}
            >
                <Text style={tw('w-[410px] text-left -mt-2')}>Room Type</Text>
                <Text style={tw('w-[124px] -mt-2')}>Project Count</Text>
                <Text style={tw('w-[148px] -mt-2 text-right')}>Room Type Sub Cost</Text>
            </View>
            {renovationAreaData?.map((rowData, index) => (
                <View
                    key={index}
                    style={{
                        ...tw(
                            `${
                                index % 2 ? 'bg-foxy-value' : 'bg-foxy-normal-light-gray'
                            } border-none flex flex-row gap-[40px] px-4 py-[10px] justify-between h-[39px]`
                        ),
                        color: textColors['foxy-table-text']
                    }}
                    wrap={false}
                >
                    <Text style={tw('w-[410px] text-left')}>{rowData.label}</Text>
                    <Text style={tw('w-[124px]')}>
                        {formatNumber(rowData.areaProjectItemCount)}
                    </Text>
                    <Text style={tw('w-[148px] text-right')}>
                        {formatCurrency(rowData.areaTotal, undefined, 1)}
                    </Text>
                </View>
            ))}
            <View
                style={tw(
                    'flex flex-row items-center bg-foxy-section-header font-bold rounded-b-sm px-4 py-[10px] gap-[40px] justify-between h-[39px]'
                )}
                wrap={false}
            >
                <Text style={tw('w-[410px] text-left -mt-2')}>Total: </Text>

                <Text style={tw('w-[124px] -mt-2')}>
                    {formatNumber(
                        renovationAreaData?.reduce(
                            (tot, cur) => tot + cur.areaProjectItemCount,
                            0
                        ) || 0
                    )}
                </Text>
                <Text style={tw('w-[148px] -mt-2 text-right')}>
                    {formatCurrency(
                        renovationAreaData?.reduce(
                            (tot, cur) => tot + roundNumber(cur.areaTotal, 1),
                            0
                        ),
                        undefined,
                        0
                    )}
                </Text>
            </View>
        </View>
    );
};
