// External Dependencies
import React, { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';
import { DataContext } from '../../PDFDocument';
import { formatCurrency, formatNumber } from '../../../lib/utils';

const CELL_WIDTHS = ['18%', '18%', '5%', '3%', '5%', '4%', '4%', '4%', '8%', '10%', '10%', '10%'];
const columnHeaders = [
    'street',
    'city',
    'zip',
    'distance',
    'yearBuilt',
    'sqft',
    'bedrooms',
    'baths',
    'lotSize',
    'value',
    'lastSalePrice',
    'lastSaleDate'
];

export const keyTexts: { [key: string]: string } = {
    lotSize: 'Lot Size',
    yearBuilt: 'Built',
    lastSalePrice: 'Sale Price',
    lastSaleDate: 'Sale Date',
    distance: 'Dist',
    value: 'Est. Value',
    bedrooms: 'Beds'
};

const normalizeHeader = (text: string) => keyTexts?.[text] ?? text;

export const Comparables = () => {
    const { jsonData } = useContext(DataContext!);
    if (jsonData?.avm?.status !== 'completed' && jsonData?.avm?.status !== 'partial_failure')
        return <></>;

    let comparables = jsonData?.avm.comparables || [];

    const headers: string[] = [];
    const columnKeys = Object.keys(comparables?.[0] || []);
    for (const col of columnHeaders) {
        if (columnKeys.includes(col)) {
            headers.push(normalizeHeader(col));
        }
    }

    const normalStyle = `flex flex-row gap-[13px] text-xs items-center text-center `;
    const headerStyle = `px-4 py-[12px] font-bold bg-foxy-mid-green rounded-t-sm text-white capitalize `;
    const itemStyle = `px-4 py-[10px] text-[10px] `;
    const widths = [...CELL_WIDTHS];

    const displayItems = [
        {
            style: normalStyle + headerStyle + 'mt-[10px] ',
            items: headers
        }
    ];

    // sort by weight
    if ('weight' in comparables[0]) {
        comparables.sort((a, b) => {
            return +b['weight'] - +a['weight'];
        });
    }

    for (let i = 0; i < comparables.length; i++) {
        let items: string[] = [];
        for (const key of columnHeaders) {
            if (comparables[i]?.[key]) {
                let transformedValue = comparables[i]?.[key];

                if (key === 'value' || key === 'lastSalePrice')
                    transformedValue = formatCurrency(transformedValue);
                else if (
                    key === 'sqft' ||
                    key === 'bedrooms' ||
                    key === 'baths' ||
                    key === 'lotSize'
                )
                    transformedValue = String(formatNumber(transformedValue));
                if (key === 'bedrooms' || key === 'baths')
                    transformedValue = String(+transformedValue || 'N/A');
                items.push(transformedValue);
            }
        }

        displayItems.push({
            style:
                normalStyle +
                itemStyle +
                (i === comparables.length - 1 ? 'rounded-b-sm ' : ' ') +
                (i % 2 === 0 ? 'bg-foxy-normal-light-gray ' : 'bg-foxy-value '),
            items
        });
    }

    const getColumnStyle = (index: number) => {
        if (index === 5 || index === 8 || index === 9 || index === 10) return 'text-right';
        return 'text-center';
    };

    return (
        <View break>
            <Text
                style={{
                    ...tw('text-lg font-bold '),
                    color: textColors['foxy-section-header']
                }}
            >
                Comparables
            </Text>

            {displayItems.map((row, i) => (
                <View style={tw(row.style)} key={i} wrap={false}>
                    {row.items.map((item, j) => (
                        <Text style={{ ...tw(getColumnStyle(j)), width: widths[j] }} key={j}>
                            {item}
                        </Text>
                    ))}
                </View>
            ))}
        </View>
    );
};
