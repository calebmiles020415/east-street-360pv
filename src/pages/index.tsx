// External Dependencies
import Head from 'next/head';

// Internal Dependencies
import { FoxyTextStyle, Text } from '../components/elements';
import { Navbar } from '../components/layouts';
import { SubmitJSON } from '../components/layouts';

function App() {
    return (
        <>
            <Head>
                <title>EastStreet360PV</title>
                <meta name="description" content="EastStreet360PV" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="w-full">
                <Navbar />
            </header>
            <main className="w-full flex flex-col items-center">
                <Text
                    foxyStyle={FoxyTextStyle.HEADING_3}
                    className="text-center mt-6 mb-8 px-8 md:px-20"
                    printable={false}
                >
                    Submit JSON Data to the FoxyAI Property Report
                </Text>
                <SubmitJSON />
            </main>
        </>
    );
}

export default App;
