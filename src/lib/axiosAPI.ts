// External Dependencies
import axios, { AxiosError } from 'axios';
import { saveLogFile } from './utils';

export const put = async (url: string, options: any = {}) => {
    options.method = 'PUT';
    const response = await callAPI(url, options);
    return response;
};

export const get = async (url: string, options: any = {}) => {
    options.method = 'GET';
    const response = await callAPI(url, options);
    return response;
};

export const post = async (url: string, options: any = {}) => {
    options.method = 'POST';
    const response = await callAPI(url, options);
    return response;
};

export const remove = async (url: string, options: any = {}) => {
    options.method = 'DELETE';
    const response = await callAPI(url, options);
    return response;
};

export const patch = async (url: string, options: any = {}) => {
    options.method = 'PATCH';
    const response = await callAPI(url, options);
    return response;
};

export const callAPI = async (url: string, options: any = {}) => {
    const { method = 'GET', baseURL, headers, params, data, auth } = options;
    try {
        const response = await axios({
            method,
            url,
            baseURL,
            headers,
            params,
            data,
            auth
        });

        return response.data;
    } catch (error: any) {
        const e = new AxiosError(error);
        saveLogFile(JSON.stringify(e.toJSON()), 'error', e.message);
        return error.response;
    }
};

const axiosAPI = { put, get, post, remove, patch };
export default axiosAPI;
