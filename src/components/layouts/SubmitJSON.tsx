// External Dependencies
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import dynamic from 'next/dynamic';
import * as HtmlToImage from 'html-to-image';

// Internal Dependencies
import { PDFDocument } from '../';
import { ImageGroupRawType, ImageGroupType } from '../../interface/ImageGroup';
import useStore from '../../store';
import { Button } from '../elements';
import { Spinner } from '../elements/Spinner';
import foxyAPI from '../../lib/foxyAPI';
import { getDamageGalleryData, getGalleryData, getImageBlob } from '../../lib/utils';
import { GalleryItem } from '../report';
import { IndexGraphItemType } from '../../interface';
import { saveLogFile } from '../../lib/utils';

const IndexGraph = dynamic(() => import('../report/IndexTools/IndexGraph'), { ssr: false });

const monthCount = 12;
const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

const parseIndexData = (jsonData: ImageGroupType): IndexGraphItemType[] => {
    const data: IndexGraphItemType[] = [];
    const {
        zipIndex: Zip,
        countyIndex: County,
        metroIndex: Metro,
        propertyIndex: Property
    } = jsonData.avm.indexes;
    // const startMonth = +StartDate?.split('/')[0];
    // const startYear = +StartDate?.split('/')[1];
    const startMonth = 1;
    const startYear = 2005;
    const len = Math.max(Zip?.length || 0 , County?.length || 0, Metro?.length || 0, Property?.length || 0);
    if (!len) return [];
    for (let i = 0; i < len; i++) {
        let month = startMonth + i;
        let year = startYear + Math.floor((month - 1) / monthCount);
        const item: IndexGraphItemType = {
            month: `${months[month % monthCount]} ${year}`
        };
        if (Zip?.[i]) item.Zip = Zip[i];
        if (County?.[i]) item.County = County[i];
        if (Property?.[i]) item.Property = Property[i];
        if (Metro?.[i]) item.Metro = Metro[i];
        data.push(item);
    }
    return data;
};

export const SubmitJSON = () => {
    const {
        imageGroupRawData,
        jsonData,
        logoUrl,
        pdfTemplate,
        setJSONData,
        setApiKey,
        setImageGroupRawData,
        setLogoUrl,
        setPDFTemplate
    } = useStore();
    const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
    const [damageGalleryData, setDamageGalleryData] = useState<GalleryItem[]>([]);
    const [classCount, setClassCount] = useState({});
    const [graphData, setGraphData] = useState<IndexGraphItemType[]>([]);
    const [image, setImage] = useState('');

    const [json, setJSON] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [printable, setPrintable] = useState(false);
    const [imageGroupId, setImageGroupId] = useState('');

    const onSubmit = async () => {
        try {
            const _jsonData = JSON.parse(json);

            // check image group Id
            if (!_jsonData.reportId) {
                saveLogFile('Report Id Key is missed!', 'error');
                return;
            }
            // check api key
            if (!_jsonData.apiKey) {
                saveLogFile('API Key is missed!', 'error');
                return;
            }
            setApiKey(_jsonData.apiKey);
            getImageGroupData(_jsonData.reportId, _jsonData.apiKey, _jsonData?.apiBaseUrl);
        } catch (e: any) {
            saveLogFile(e.message, 'error');
        }
    };

    // pre render index graph
    const renderImage = (): Promise<string> => {
        return new Promise((res, rej) => {
            let time = 0;
            const interval = setInterval(() => {
                (async () => {
                    let node = document.getElementById('index_graph');
                    time++;
                    if (node?.hasChildNodes()) {
                        setTimeout(async () => {
                            const png = await HtmlToImage.toPng(node as HTMLElement, {
                                backgroundColor: 'transparent'
                            });
                            res(png);
                        }, 3000);
                        clearInterval(interval);
                    } else if (time === 10) {
                        clearInterval(interval);
                        rej('no index plots');
                    }
                })();
            }, 500);
        });
    };

    // get image group raw data using image group id and api key
    const getImageGroupData = async (_reportId: string, _apiKey: string, baseURL?: string) => {
        setLoading(true);
        const fullJSONData = await foxyAPI.getFullJSONData(_reportId, _apiKey, baseURL);
        const template = await foxyAPI.getPDFTemplate(_apiKey, baseURL);

        let url =
            template?.templateSettings?.head?.subComponents?.headLogo?.settings?.logoUrl || '';
        if (url) url = await getImageBlob(url, undefined, undefined, false);
        setLogoUrl(url);

        const _imageGroupId = fullJSONData.imageGroupId;
        setJSONData(fullJSONData);
        setImageGroupId(_imageGroupId);
        setPDFTemplate(template);

        const _imageGroupData = (await foxyAPI.getImageGroupResults(
            _imageGroupId,
            _apiKey,
            baseURL
        )) as ImageGroupRawType;
        setImageGroupRawData(_imageGroupData);

        // prefetch property photos
        // const propertyPhotos = await getGalleryData(_imageGroupData!, _apiKey, baseURL);
        // const _damageGalleryData = await getDamageGalleryData(_imageGroupData!, _apiKey, baseURL);
        // setGalleryData(propertyPhotos.galleryData);
        // setClassCount(propertyPhotos.classCount);
        // setDamageGalleryData(_damageGalleryData);
        if (
            fullJSONData?.avm?.status === 'completed' ||
            fullJSONData?.avm?.status === 'partial_failure'
        ) {
            console.log(parseIndexData(fullJSONData));
            setGraphData(parseIndexData(fullJSONData));
            try {
                setImage(await renderImage());
            } catch (e) {
                console.log(e);
            }
        }

        setPrintable(true);
        setLoading(false);
    };

    // log errors
    const saveErrorLogFile = (error: Error) => {
        saveLogFile(error, `property-report-${imageGroupId}-error`);
        setPrintable(false);
    };

    // save pdf file
    const savePDFFile = (blob: Blob) => {
        saveAs(blob, `property-report-${imageGroupId}.pdf`);
        setPrintable(false);
    };

    return (
        <div className="flex flex-col">
            <div className="flex mx-auto">
                <textarea
                    className="w-96 mr-4 border-0 outline-none rounded-default text-sm h-44"
                    name="jsondata"
                    id="jsondata"
                    placeholder="JSON Data"
                    onChange={(e) => setJSON(e.target.value)}
                />
                <Button onClick={onSubmit}>Submit</Button>
            </div>
            <div className="p-4">
                {isLoading ? (
                    <Spinner text="Rendering PDF..." />
                ) : (
                    printable && (
                        <PDFDownloadLink
                            document={
                                <PDFDocument
                                    imageGroupRawData={imageGroupRawData!}
                                    jsonData={jsonData!}
                                    galleryData={galleryData}
                                    damageGalleryData={damageGalleryData}
                                    classCount={classCount}
                                    image={image}
                                    logo={logoUrl}
                                    pdfTemplate={pdfTemplate}
                                />
                            }
                            fileName={`property-report-${imageGroupId}.pdf`}
                        >
                            {({ blob, url, loading, error }) => {
                                if (error) {
                                    saveErrorLogFile(error);
                                    return <></>;
                                }
                                if (!loading && blob && printable) {
                                    savePDFFile(blob);
                                    return <></>;
                                }
                                return loading && <Spinner text="Rendering PDF..." />;
                            }}
                        </PDFDownloadLink>
                    )
                )}
            </div>
            {/* pre render index graph */}
            <div className="w-[1200px] bg-gradient-to-b from-foxy-header-grad-start to-foxy-header-grad-end text-foxy-normal-light-gray mt-16 -top-[1000px] absolute">
                <div id="index_graph" className="w-full">
                    {graphData?.length > 0 && <IndexGraph graphData={graphData} />}
                </div>
            </div>
            {/* pre render index graph */}
        </div>
    );
};
