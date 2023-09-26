// External Dependencies
import { Image, Text, View } from '@react-pdf/renderer';
import { useContext } from 'react';

// Internal Dependencies
import { textColors, tw } from '../../../../styles/pdfStyle';
import { DataContext } from '../../PDFDocument';

export const Disclaimers: React.FunctionComponent = () => {
    const { jsonData } = useContext(DataContext!);

    return (
        <View break>
            <Text
                style={{
                    ...tw('text-lg font-bold'),
                    color: textColors['foxy-section-header']
                }}
            >
                Disclaimers
            </Text>
            <View style={tw('px-6 py-8 bg-foxy-normal-light-gray rounded-sm mt-4')}>
                <Text
                    style={{
                        ...tw('text-sm break-words'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    This <Text style={tw('font-bold')}>estimate of market value</Text> is computer
                    generated by the application of various mathematical formulas and techniques
                    proprietary to FoxyAI, Inc, to available public record, local market, partner
                    and proprietary data. This report has not been prepared by a licensed appraiser
                    nor does it constitute an appraisal of the subject property and should not be
                    relied upon as such. The data used to generate this report does not include
                    information that could be derived from an inspection of the subject property and
                    its surroundings. The condition of the property could greatly affect the
                    accuracy of the estimate of value. The data and the information derived from the
                    data in this report is provided as available and “AS IS” and is intended for
                    internal asset valuation use only. All uses are at the user’s sole risk. FoxyAI
                    Inc. is not liable for the accuracy of the data or information provided in this
                    report. The accuracy of the data and methodologies used are deemed reliable but
                    are not warranted or guaranteed. The{' '}
                    <Text style={tw('font-bold')}>charts and graphs</Text> contained herein are
                    computer generated by the application of various mathematical formulas and
                    techniques proprietary to FoxyAI Inc. to available public record, local market,
                    partner and proprietary data compiled by FoxyAI Inc. Such data is deemed
                    reliable but may not be complete or accurate in all cases and is not guaranteed.
                    FoxyAI, Inc. is not liable for the accuracy of the information provided. The
                    information displayed in these graphics is provided “AS IS” and is intended for
                    internal asset valuation use only. All uses are at the user’s sole risk.
                </Text>
            </View>
            <View style={tw('px-6 pt-8 pb-10 bg-foxy-normal-light-gray rounded-sm mt-6')}>
                <Image src="/images/disclaimer@2x.png" style={tw('w-12 h-12 object-cover')} />
                <Text
                    style={{
                        ...tw('text-sm mt-6 break-words'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    Equal Housing Opportunity Statement: We are pledged to the letter and spirit of
                    U.S. policy for the achievement of equal housing opportunity throughout the
                    Nation. We encourage and support an affirmative advertising and marketing
                    program in which there are no barriers to obtaining housing because of race,
                    color, religion, sex, handicap, familial status, or national origin.
                </Text>
            </View>
            <Text
                style={{
                    ...tw('text-lg font-bold mt-16'),
                    color: textColors['foxy-section-header']
                }}
            >
                Report Id
            </Text>
            <View style={tw('px-6 py-4 bg-foxy-normal-light-gray rounded-sm mt-6')}>
                <Text
                    style={{
                        ...tw('text-sm px-6 break-words'),
                        color: textColors['foxy-obsidian-gray']
                    }}
                >
                    {jsonData?.id}
                </Text>
            </View>
        </View>
    );
};