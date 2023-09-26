import React, { useContext } from 'react';
import { Image, View, Text } from '@react-pdf/renderer';
import { tw } from '../../../styles/pdfStyle';
import { PAGE_SIZE } from '../../constants';
import { DataContext } from '../PDFDocument';

const headerStyles = {
    wrapper: tw(
        'w-full bg-foxy-button h-[72px] absolute top-0 px-8 py-4 flex flex-row items-center justify-between mb-4 w-full'
    ),
    image: tw('max-w-[150px] max-h-[60px] object-contain'),
    text: tw('text-right text-white flex flex-col items-end'),
    title: tw('text-base font-bold text-white'),
    subtitle: tw('text-[11px]')
};

interface HeaderProps {
    logo?: string;
}

export const Header: React.FC<HeaderProps> = ({ logo }) => {
    const { pdfTemplate } = useContext(DataContext);
    const { display, subComponents } = pdfTemplate?.templateSettings?.head || {};

    if (!display) return <></>;

    return (
        <View style={{ ...headerStyles.wrapper, width: PAGE_SIZE.width }} fixed>
            {subComponents?.headLogo?.display && <Image src={logo} style={headerStyles.image} />}
            <View style={headerStyles.text}>
                {subComponents?.headTitle?.display && (
                    <Text style={headerStyles.title}>
                        {subComponents?.headTitle?.settings?.text}
                    </Text>
                )}
                {subComponents?.headSubTitle?.display && (
                    <Text style={headerStyles.subtitle}>
                        {subComponents?.headSubTitle?.settings?.text}
                    </Text>
                )}
            </View>
        </View>
    );
};

Header.defaultProps = {
    logo: '/images/FoxyAI_Color_WhiteText.png'
};
