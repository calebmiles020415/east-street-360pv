// External Dependencies
import { View, Text } from '@react-pdf/renderer';

// Internal Dependencies
import { textColors, tw } from '../../../styles/pdfStyle';
import { Value, FoxyValueStyle } from './Value';

interface Props {
    title?: string;
    subTitle?: string;
    value?: string;
}

export const RenovationHeading = ({ title, subTitle, value = '' }: Props) => {
    return (
        <View
            style={tw(
                'flex flex-col rounded-sm justify-center w-full items-center bg-foxy-normal-light-gray px-4 py-4'
            )}
            wrap={false}
        >
            <Text
                style={{
                    ...tw('text-base leading-[18px] text-center'),
                    color: textColors['foxy-obsidian-gray']
                }}
            >
                {title}
            </Text>
            {subTitle && (
                <Text
                    style={{
                        ...tw('text-base leading-[18px] text-center'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    {subTitle}
                </Text>
            )}
            <Value
                text={value}
                size={subTitle ? FoxyValueStyle.SIZE_2 : FoxyValueStyle.SIZE_1}
                className="mt-2"
            />
        </View>
    );
};
