// External Dependencies
import { Text, View } from '@react-pdf/renderer';

// Internal Dependencies
import { textColors, tw } from '../../../styles/pdfStyle';

export enum FoxyValueStyle {
    SIZE_1 = 'SIZE_1',
    SIZE_2 = 'SIZE_2',
    SIZE_3 = 'SIZE_3',
    SIZE_4 = 'SIZE_4'
}

const foxyTextStyleValues = {
    SIZE_1: {
        width: 'w-[339px]',
        size: 'text-base'
    },
    SIZE_2: {
        width: 'w-[215px]',
        size: 'text-base'
    },
    SIZE_3: {
        width: 'w-[101px]',
        size: 'text-sm'
    },
    SIZE_4: {
        width: 'w-[67px]',
        size: 'text-sm'
    }
};

interface Props {
    text: string | number;
    size?: FoxyValueStyle;
    className?: string;
}

export const Value = ({ text, size = FoxyValueStyle.SIZE_4, className = '' }: Props) => {
    return (
        <View
            style={tw(
                `${foxyTextStyleValues[size].size} ${foxyTextStyleValues[size].width} rounded-sm bg-foxy-value font-bold leading-4 text-center align-middle flex flex-row items-center justify-center ${className} px-4`
            )}
        >
            <Text
                style={{
                    ...tw(`-mt-2 align-middle py-[6px]`),
                    color: textColors['foxy-mid-green']
                }}
            >
                {text ?? 'No Data Available'}
            </Text>
        </View>
    );
};
