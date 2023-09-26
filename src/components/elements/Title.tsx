// External Dependencies
import { Text, View } from '@react-pdf/renderer';

// Internal Dependencies
import { tw } from '../../../styles/pdfStyle';

interface TitleProps {
    type: string;
    scores: string;
}

export const Title: React.FC<TitleProps> = ({ type, scores }) => {
    return (
        <View
            style={tw(
                'text-sm leading-4 text-white pl-[10px] pr-6 h-36px text-left bg-foxy-header-grad-end w-full rounded-t-sm flex flex-row gap-2'
            )}
        >
            <Text style={tw('-mt-2 font-bold py-4')}>{type}</Text>
            <Text style={tw('-mt-2 py-4')}>{scores}</Text>
        </View>
    );
};
