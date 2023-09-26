// External Dependencies
import { create } from 'zustand';
import { PDFTemplate } from './interface';

// Internal Dependencies
import { ImageGroupType, ImageGroupRawType } from './interface/ImageGroup';

export interface IState {
    jsonData?: ImageGroupType;
    apiKey?: string;
    imageGroupRawData?: ImageGroupRawType;
    logoUrl?: string;
    pdfTemplate?: PDFTemplate;
    setJSONData: (jsonData: ImageGroupType) => void;
    setApiKey: (apiKey: string) => void;
    setImageGroupRawData: (rawData: ImageGroupRawType) => void;
    setLogoUrl: (url: string) => void;
    setPDFTemplate: (template: PDFTemplate) => void;
}

// store
const useStore = create<IState>((set) => ({
    setJSONData: (jsonData) =>
        set((state: IState) => ({
            ...state,
            jsonData
        })),
    setApiKey: (apiKey) =>
        set((state: IState) => ({
            ...state,
            apiKey
        })),
    setImageGroupRawData: (rawData) =>
        set((state: IState) => ({
            ...state,
            imageGroupRawData: rawData
        })),
    setLogoUrl: (url) =>
        set((state: IState) => ({
            ...state,
            logoUrl: url
        })),
    setPDFTemplate: (template) =>
        set((state: IState) => ({
            ...state,
            pdfTemplate: template
        }))
}));

export default useStore;
