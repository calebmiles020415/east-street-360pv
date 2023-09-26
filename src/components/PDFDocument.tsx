// External Dependencies
import { Document, Font, Page, StyleSheet, View } from '@react-pdf/renderer';
import { createContext } from 'react';

import { PDFDataType } from '../interface/ImageGroup';

// Internal Dependencies
import { FooterReport } from './layouts/FooterReport';
import { Header } from './layouts/Header';
import {
    Appendix,
    Comparables,
    DamageDetection,
    Disclaimers,
    FoxyScoreDefinition,
    PropertyDetails,
    PropertyPhotos,
    PropertyState,
    RenovationRepair,
    ScoreDefinition
} from './report';
import { IndexTools } from './report/IndexTools';
import { PAGE_SIZE } from '../constants';

// Font Registration
import FontLight from 'public/fonts/Poppins-Light.ttf';
import FontRegular from 'public/fonts/Poppins-Regular.ttf';
import FontMeidum from 'public/fonts/Poppins-SemiBold.ttf';
import FontMediumItalic from 'public/fonts/Poppins-MediumItalic.ttf';
import FontItalic from 'public/fonts/Poppins-Italic.ttf';
import FontBold from 'public/fonts/Poppins-Bold.ttf';

Font.register({
    family: 'Poppins',
    fonts: [
        { src: FontLight },
        { src: FontRegular },
        { src: FontMeidum, fontWeight: 'semibold' },
        { src: FontBold, fontWeight: 'bold' },
        { src: FontItalic, fontStyle: 'italic' }
    ]
});

export const DataContext = createContext<PDFDataType>({});

export const styles = StyleSheet.create({
    page: {
        fontFamily: 'Poppins',
        paddingHorizontal: 32,
        paddingTop: 88,
        paddingBottom: 53
    }
});

export const PDFDocument = (props: PDFDataType) => {
    return (
        <DataContext.Provider value={props}>
            <Document>
                <Page size={{ ...PAGE_SIZE }} style={styles.page}>
                    <Header logo={props.logo} />
                    <PropertyDetails />
                    <PropertyState />
                    <IndexTools />
                    <Comparables />
                    <PropertyPhotos />
                    <DamageDetection />
                    <RenovationRepair />
                    <Appendix />
                    <ScoreDefinition />
                    <FoxyScoreDefinition />
                    <Disclaimers />
                    <FooterReport />
                </Page>
            </Document>
        </DataContext.Provider>
    );
};
