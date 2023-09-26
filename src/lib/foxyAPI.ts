// Internal Dependencies
import { ImageGroupRawType, ImageGroupType, PDFTemplate } from '../interface';
import axiosAPI from './axiosAPI';

export const V2_API_URL = 'https://api.foxyai.com';

const headers = { 'Content-Type': 'application/json' };

export const getImageGroupResults = async (
    foxyApiId: string,
    foxyApiKey: string,
    apiBaseURL?: string
): Promise<ImageGroupRawType> => {
    const getImageGroupResults: any = await axiosAPI.get(`/image-group/${foxyApiId}/results`, {
        headers: {
            ...headers,
            authorization: `Bearer ${foxyApiKey}`
        },
        baseURL: apiBaseURL || V2_API_URL
    });
    return getImageGroupResults;
};

export const getMedia = async (
    imageUrl: string,
    foxyApiKey: string,
    apiBaseURL?: string
): Promise<any> => {
    const getMediaResults: any = await axiosAPI.get(`/media?url=${imageUrl}`, {
        headers: {
            ...headers,
            authorization: `Bearer ${foxyApiKey}`
        },
        baseURL: apiBaseURL || V2_API_URL
    });
    return getMediaResults;
};

export const getFullJSONData = async (
    reportId: string,
    foxyApiKey: string,
    apiBaseURL?: string
): Promise<ImageGroupType> => {
    const fullJSONDataResults: any = await axiosAPI.get(`/360-report/${reportId}/pdf-gen`, {
        headers: {
            ...headers,
            authorization: `Bearer ${foxyApiKey}`
        },
        baseURL: apiBaseURL || V2_API_URL
    });
    return fullJSONDataResults;
};

export const getPDFTemplate = async (
    foxyApiKey: string,
    apiBaseURL?: string
): Promise<PDFTemplate> => {
    const pdfTemplateResults = await axiosAPI.get(`/360-report-template`, {
        headers: {
            ...headers,
            authorization: `Bearer ${foxyApiKey}`
        },
        baseURL: apiBaseURL || V2_API_URL
    });
    return pdfTemplateResults;
};

const foxyAPI = {
    getImageGroupResults,
    getFullJSONData,
    getMedia,
    getPDFTemplate
};

export default foxyAPI;
