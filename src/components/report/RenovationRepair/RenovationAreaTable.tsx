// External Dependencies
import { View, Text } from '@react-pdf/renderer';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';
import { AreaType } from '../../../interface';
import { formatCurrency, formatNumber, roundNumber } from '../../../lib/utils';

interface Props {
    repairData?: AreaType;
    mbSize: number;
}

export const RenovationAreaTable = ({ repairData, mbSize }: Props) => {
    return (
        <View
            style={tw(`mt-[20px] text-[13px] leading-4 text-white w-full text-center mb-[${mbSize}px]`)}
        >
            <View
                style={tw(
                    'py-[12px] px-[14px] flex flex-row bg-foxy-table-text rounded-t-sm w-full justify-between h-[44px] border-none'
                )}
                wrap={false}
            >
                <Text style={tw('w-[410px] whitespace-nowrap font-bold text-left')}>
                    {repairData?.label}
                </Text>
                <Text style={tw('w-[410px] whitespace-nowrap text-right')}>
                    {repairData?.label + 'Area Project Count Total: '}
                </Text>
                <Text style={tw('whitespace-nowrap font-bold text-right')}>
                    {repairData?.areaProjectCount}
                </Text>
            </View>

            <View
                style={tw(
                    'flex flex-row bg-foxy-mid-green items-center px-4 py-[10px] gap-[40px] justify-between h-[39px] border-none'
                )}
                wrap={false}
            >
                <Text style={tw('w-[410px] text-left -mt-2')}>Description</Text>
                <Text style={tw('w-[124px] -mt-2')}>Project Subtotal</Text>
                <Text style={tw('w-[148px] -mt-2 text-right')}>Project Item Count</Text>
            </View>
            {repairData?.remodelProjects.map((rowData, index) => (
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
                    <Text style={tw('w-[410px] text-left')}>{rowData.name}</Text>
                    <Text style={tw('w-[124px]')}>${rowData.projectSubTotal.toFixed(2)}</Text>
                    <Text style={tw('w-[148px] text-center')}>
                        {formatNumber(rowData.projectItemCount)}
                    </Text>
                </View>
            ))}
            <View
                style={tw(
                    'flex flex-row items-center bg-foxy-section-header font-bold rounded-b-sm px-4 py-[10px] gap-[40px] justify-between h-[39px]'
                )}
                wrap={false}
            >
                <Text style={tw('w-[410px] text-left -mt-2')}>Area Total: </Text>

                <Text style={tw('w-[148px] -mt-2')}>
                    $
                    {(
                        repairData?.remodelProjects.reduce(
                            (tot, cur) => tot + cur.projectSubTotal,
                            0
                        ) || 0
                    ).toFixed(2)}
                </Text>
                <Text style={tw('w-[148px] -mt-2 text-center')}>
                    {repairData?.remodelProjects.reduce(
                        (tot, cur) => tot + cur.projectItemCount,
                        0
                    )}
                </Text>
            </View>
        </View>
    );
};
