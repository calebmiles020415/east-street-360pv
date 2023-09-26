import axios from 'axios';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

import { GalleryItem } from '../components/report';
import { DAMAGE_MODELS, keyTexts } from '../constants';
import { ImageGroupRawType, ImageRawType } from '../interface';
import { getPresignedUrl } from './api';

const FOXY_S3_URL = 'https://foxy-v2-media-prod.s3.us-east-1.amazonaws.com';

export const formatCurrency = (
    money?: number | string,
    secondValue?: number,
    round: number = 3
) => {
    if (typeof money === 'string') money = Number(money);
    if (money === undefined) {
        if (secondValue) return 'See Valpro Below';
        return 'Not Available';
    }
    if (!money) return '$0';
    let fiatFormatter = new Intl.NumberFormat('en-US');
    return `$${fiatFormatter.format(Math.floor(roundNumber(money, round)))}`;
};

export const formatNumber = (number: string | number) => {
    const formatter = new Intl.NumberFormat('en-US');
    const formattedNumber = formatter.format(number);
    return formattedNumber === 'NaN' ? roundNumber(+number) : formattedNumber;
};

export const roundNumber = (number: number, round: number = 3) => {
    if (!round) return number;
    return Math.round(number / Math.pow(10, round)) * Math.pow(10, round);
};

export const normalizeText = (text: string) => {
    return keyTexts?.[text] || text;
};

const sortImagesByConfidence = (images: ImageRawType[]) => {
    const sortedImages = [...images];
    images.sort((a, b) => {
        const confidenceA =
            a?.models?.room_classification.results[0]?.confidence ||
            b?.models?.scene_classification.results[0]?.confidence;
        const confidenceB =
            a?.models?.room_classification.results[0]?.confidence ||
            b?.models?.scene_classification.results[0]?.confidence;
        const sortKey = confidenceB - confidenceA;
        if (isNaN(sortKey)) return 0;
        return sortKey;
    });
    return sortedImages;
};

export const getImageBlob = async (
    imageUrl: string,
    key?: string,
    baseURL?: string,
    compress = true
) => {
    const isFoxyImage = imageUrl.includes(FOXY_S3_URL);
    const url = isFoxyImage ? await getPresignedUrl(imageUrl, key!, baseURL) : imageUrl;
    let newUrl = url;

    try {
        const res = await axios.post(
            '/api/foxy/getImageBlob',
            { url, compress },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        newUrl = res.data;
    } catch (e) {
        console.log(e);
    }
    return newUrl;
};

export const getGalleryData = async (
    imageGroupRawData: ImageGroupRawType,
    key: string,
    baseURL?: string
) => {
    const MIN_CONFIDENCE = 0.5;
    const MISC_CARD_NAME = 'Miscellaneous';

    let galleryData: GalleryItem[] = [];

    // group by room types
    let imageData: any = {
        subPhotos: {},
        image: {},
        count: {}
    };

    // get Image by imageResult
    const getImage = (imageResult: any) => {
        return {
            url: imageResult.url,
            finalTitle:
                imageResult?.models?.room_classification.results[0]?.class ||
                imageResult?.models?.scene_classification.results[0]?.class,
            confidence:
                imageResult?.models?.room_classification.results[0]?.confidence ||
                imageResult?.models?.scene_classification.results[0]?.confidence
        };
    };

    // compose images
    const composeImages = async () => {
        if (!imageGroupRawData?.images?.length) return;

        const images = sortImagesByConfidence(imageGroupRawData.images);

        for (let imageResult of images) {
            const image = getImage(imageResult);
            if (image.finalTitle) {
                let imageClassName = image.finalTitle;
                if (
                    image.finalTitle === 'Misc' ||
                    (image.confidence && image.confidence < MIN_CONFIDENCE)
                ) {
                    if (!imageData.count[image.finalTitle]) imageData.count[image.finalTitle] = 0;
                    imageClassName = MISC_CARD_NAME;
                }

                if (!imageData.subPhotos[imageClassName]) imageData.subPhotos[imageClassName] = [];

                let newUrl = image.url;

                // limit sub photos to 5
                if (imageData.subPhotos[imageClassName].length < 5) {
                    newUrl = await getImageBlob(image.url, key, baseURL);
                }

                imageData.subPhotos[imageClassName].push(newUrl);

                if (!imageData.image[imageClassName]) {
                    newUrl = await getImageBlob(image.url, key, baseURL);
                    imageData.image[imageClassName] = newUrl;
                }

                if (!imageData.count[imageClassName]) imageData.count[imageClassName] = 0;
                imageData.count[imageClassName]++;
            }
        }

        Object.keys(imageData.count).forEach((key) => {
            if (imageData.count[key]) {
                galleryData.push({
                    mainPhoto: imageData.image[key],
                    propertyType: key,
                    conditionScore: imageGroupRawData.computedMetrics.condition?.[key],
                    qualityScore: imageGroupRawData.computedMetrics.quality?.[key],
                    subPhotos: imageData.subPhotos[key]
                });
            }
        });
    };

    await composeImages();

    return {
        classCount: imageData.count,
        galleryData
    };
};

export const getDamageGalleryData = async (
    imageGroupRawData: ImageGroupRawType,
    key: string,
    baseURL?: string
) => {
    const galleryData: GalleryItem[] = [];

    const composeImages = async () => {
        let imageData: any = {
            subPhotos: {},
            image: {}
        };

        if (imageGroupRawData?.images?.length) {
            const images = sortImagesByConfidence(imageGroupRawData.images);
            for (let processedImage of images) {
                const general_damage_type =
                    processedImage.models?.general_damage?.results?.[0]?.class;
                if (general_damage_type === 'Damage') {
                    const damageTyes = Object.keys(DAMAGE_MODELS);
                    for (let i = 0; i < damageTyes.length; i++) {
                        const damage_type = damageTyes[i];
                        let isAdded = false;
                        if (processedImage.models?.[damage_type]) {
                            const results = processedImage.models[damage_type].results;
                            for (let j = 0; j < results.length; j++) {
                                const damage_result = results[j];
                                if (
                                    !isAdded &&
                                    DAMAGE_MODELS?.[damage_type]?.find(
                                        (damage_class: string) =>
                                            damage_class === damage_result?.class
                                    )
                                ) {
                                    let damage_title = damage_result?.class;
                                    if (damage_type === 'general_damage')
                                        damage_title = 'General Damage';
                                    if (!imageData.subPhotos[damage_title])
                                        imageData.subPhotos[damage_title] = [];

                                    let newUrl = processedImage.url;
                                    if (imageData.subPhotos[damage_title].length < 5) {
                                        newUrl = await getImageBlob(
                                            processedImage.url,
                                            key,
                                            baseURL
                                        );
                                    }

                                    imageData.subPhotos[damage_title].push(newUrl);

                                    if (!imageData.image[damage_title]) {
                                        newUrl = await getImageBlob(
                                            processedImage.url,
                                            key,
                                            baseURL
                                        );
                                        imageData.image[damage_title] = newUrl;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        Object.keys(imageData.image).forEach((key) => {
            if (imageData.image[key]) {
                galleryData.push({
                    mainPhoto: imageData.image[key],
                    propertyType: key,
                    subPhotos: imageData.subPhotos[key]
                });
            }
        });
    };

    await composeImages();

    return galleryData;
};

export const saveLogFile = (error: Error | string, fileName: string, message?: string) => {
    const errorData =
        typeof error === 'string'
            ? error
            : JSON.stringify({
                  cause: error.cause,
                  message: error.message,
                  name: error.name,
                  stack: error.stack
              });
    const errorMessage = message ?? (typeof error === 'string' ? errorData : error.message);
    const errorLog = new Blob([errorData], {
        type: 'text/plain'
    });

    saveAs(errorLog, fileName + '-' + new Date().toISOString() + '.log');
    toast.error(errorMessage, { autoClose: 3000 });
    console.log('@error', errorData);
};
