// External Dependencies
import { View, Text, Link, Image } from '@react-pdf/renderer';

// Internal Dependencies
import { tw } from '../../../styles/pdfStyle';
import { PAGE_SIZE } from '../../constants';

const footerStyles = {
    wrapper: tw(
        'bg-foxy-footer flex flex-row items-center h-[37px] bottom-0 px-8 text-white justify-between text-[11px] mt-4 absolute'
    ),
    link: tw('no-underline'),
    image: tw('w-[65px] h-[15px]'),
    text: tw('-mt-1'),
    pageNumber: tw('-mt-1')
};

export const FooterReport = () => {
    return (
        <View style={{ ...footerStyles.wrapper, width: PAGE_SIZE.width }} fixed>
            <Link src="https://foxyai.com" style={footerStyles.link}>
                <Image src="/images/FoxyAI_Color_WhiteText.png" style={footerStyles.image} />
            </Link>
            <Text style={footerStyles.text}>© 2023 FoxyAI Inc.</Text>
            <View style={tw('flex gap-2 flex-row justify-end items-center')}>
                <Text style={{ ...footerStyles.text, ...tw('text-[9px]') }}>
                    {new Date().toISOString().substring(0, 10)}
                </Text>
                <Text
                    style={footerStyles.pageNumber}
                    render={({ pageNumber }) => pageNumber.toString().padStart(2, '0')}
                />
            </View>
        </View>
    );
};
