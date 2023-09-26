export type ComparableMetaType = {
    [key: string]: string;
};

export interface MetaDataType {
    app_data: any;
    address?: {
        city: string;
        community?: string;
        neighborhood?: string;
        state: string;
        streetAddress: string;
        subdivision?: string;
        zipcode: string;
        validated_address: string;
        metroname: string;
    };
    photo_stream: {
        zillow_s3: {
            s3_json_path: string;
            presigned: string;
        };
        public_urls: string[];
    };
    metadata_stream: {
        geolocation?: {
            lat?: number;
            lng?: number;
        };
        property_metadata: {
            Bathrooms: number;
            Bedrooms: number;
            'Living Area': number;
            'Lot Size': number;
            'Year Built': number;
        };
    };
    avm_stream: {
        weiss_s3: {
            s3_json_path: string;
            presigned: string;
        };
        comparables: ComparableMetaType[];
        valpro: {
            ValPro: string;
            'One Year Change': string;
            'Value Score': number;
            'Confidence Score': string;
        };
        forecasts: {
            'Property Forcast': string;
            'Zip Forcast': string;
            'Country Forcast': string;
            'Metro Forcast': string;
        };
        weiss_widets?: {
            heatmap_county: string[];
            heatmap_zip: string[];
        };
        IndexValues: {
            StartDate: string;
            Property: number[];
            Zip: number[];
            County: number[];
            Metro: number[];
        };
    };
    bluebook?: {
        imageGroupId: string;
        streetAddress?: string;
        city: string;
        zip: string;
        state: string;
        bedrooms?: number;
        fullbaths?: number;
        halfbaths?: number;
        larea?: number;
        ybuilt?: number;
    };
}
