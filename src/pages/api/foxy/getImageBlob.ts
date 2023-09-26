import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import { saveLogFile } from '../../../lib/utils';

const MAXWIDTH = 512;

const getImageInfo = (input: Buffer): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        sharp(input)
            .metadata()
            .then((metadata) => {
                resolve({
                    width: metadata.width || 0,
                    height: metadata.height || 0
                });
            })
            .catch((err) => reject(err));
    });
};

const base64ToJpeg = async (base64: string, quality: number) => {
    try {
        const inputBuffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const { width } = await getImageInfo(inputBuffer);
        const jpegBuffer = await sharp(inputBuffer)
            .resize(Math.min(MAXWIDTH, width), null, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .jpeg({ quality })
            .toBuffer();
        return jpegBuffer.toString('base64');
    } catch (e: any) {
        saveLogFile(e.message, 'error');
        return '';
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { url, compress } = req.body;
    try {
        let image = await axios.get(url, { responseType: 'arraybuffer' });
        let type = image.headers['content-type'];
        let returnedB64 = Buffer.from(image.data).toString('base64');

        if (compress) {
            returnedB64 = await base64ToJpeg(returnedB64, 80);
            type = 'image/jpeg';
        }
        res.status(200).send('data:' + type + ';base64,' + returnedB64);
    } catch (e) {
        res.status(404).send('not found');
    }
};
