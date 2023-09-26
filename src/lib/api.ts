// External Dependencies
import axios from 'axios';

// Internal Dependencies
import foxyAPI from './foxyAPI';

// return new url if it is expired
export const getPresignedUrl = async (
    url: string,
    foxyApiKey: string,
    apiBaseURL?: string
): Promise<string> => {
    let newUrl = url;
    try {
        await axios.get(url);
    } catch (e: any) {
        if (e.code === 'ERR_BAD_REQUEST') {
            const mediaData = await foxyAPI.getMedia(url, foxyApiKey, apiBaseURL);
            newUrl = mediaData.imageUrl;
        }
    }
    return newUrl;
};
