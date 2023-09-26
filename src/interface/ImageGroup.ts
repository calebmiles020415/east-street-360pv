import { GalleryItem } from '../components/report';
import { PDFTemplate } from './PDFTemplate';

type StatusType = 'completed' | 'processing' | 'partial_failure' | 'generating' | 'failed';

interface ComparableType {
    [key: string]: string;
}

interface AVMType {
    status: StatusType;
    comparables: ComparableType[];
    value: number;
    valPro: {
        value: number;
        oneYearChange: number;
        valueScore: number;
        confidenceScore: string;
    };
    forecasts: {
        propertyForecast: number;
        zipForecast: number;
        countyForecast: number;
        metroForecast: number;
    };
    indexes: IndexValuesType;
    weissWidgets: {
        WEISS: string;
    };
}

interface PropertyType {
    status: StatusType;
    baths: number;
    bedrooms: number;
    sqft: number;
    lotSize: number;
    yearBuilt: number;
    homeType: string;
    city: string;
    street: string;
}

interface EstimatedAreaMeasurementType {
    formulaXREF: string;
    formulaXREFValue: number;
}

interface RepairItemType {
    description: string;
    itemUM: string;
    quantity: number;
    ppu: number;
    totalCoast: number;
    itemXREF: number;
    category: string;
    subCategory: string;
    projectGroupName: string;
    projectSubGroupName: string;
    diyAmount: number;
}

interface RemodelProjectType {
    name: string;
    projectSubTotal: number;
    projectItemCount: number;
    repairItems: RepairItemType[];
}

export interface AreaType {
    label: string;
    areaType: string;
    areaTotal: number;
    areaProjectCount: number;
    areaProjectItemCount: number;
    estimatedAreaMeasurements: EstimatedAreaMeasurementType[];
    remodelProjects: RemodelProjectType[];
}

interface RenovationType {
    status: StatusType;
    estimateTotal: number;
    estimateProjectCount: number;
    estimateProjectItemCount: number;
    diyTotal: number;
    subjectProperty: {
        address: string;
        city: string;
        state: string;
        characteristics: {
            bedrooms: number;
            fullBaths: number;
            halfBaths: number;
            stories: string;
            yearBuilt: number;
            totalLivingArea: number;
            structureQuality: string;
            basementSizeSF: number;
            hasbasement: string;
            garageType: string;
            attachedGaragesNumberOfCars: string;
            builtInGaragesNumberOfCars: string;
            condition: string;
            roofPitch: string;
        };
    };
    areas: AreaType[];
}

export interface ImageGroupType {
    id: string;
    imageGroupId: string;
    apiKey: string;
    s3Upload: string;
    status: StatusType;
    address: string;
    avm: AVMType;
    property: PropertyType;
    renovation: RenovationType;
    _id?: string;
}

interface ImageId {
    id: string;
    status: StatusType;
}

interface PresingedUrl {
    s3_json_path: string;
    presigned: string;
}

export interface ImageRawType extends ImageId {
    _id: string;
    url: string;
    name?: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    imageGroups: string[];
    models: {
        image_quality: ScoreModelItem;
        quality_score: ScoreModelItem;
        condition_score: ScoreModelItem;
        room_classification: ModelItem;
        scene_classification: ModelItem;
        finish_detection: ObjectModelItem;
        exterior_architectural_style_classification: ModelItem;
        water_stain: ModelItem;
        mold_mildew_and_moss: ModelItem;
        standing_water: ModelItem;
        soffit_and_fascia: ModelItem;
        gutter: ModelItem;
        roof_tarp: ModelItem;
        roof_damage: ModelItem;
        peeling_paint: ModelItem;
        hole: ModelItem;
        borken_window: ModelItem;
        siding_damage: ModelItem;
        general_damage: ModelItem;
    };
}

export interface ImageGroupRawType {
    _id: string;
    url?: string;
    propertyId: string;
    createdAt: string;
    updatedAt: string;
    images: ImageRawType[];
    metaData: {
        address: {
            property_id: string;
            validated_address: string;
            streetAddress: string;
            city: string;
            zipcode: string;
            state: string;
            metroname: string;
        };
        s3: {
            zillow_s3: PresingedUrl;
            weiss_s3: PresingedUrl;
            full_metadata: PresingedUrl;
        };
    };
    avv_status: {
        photo_status: {
            source: string;
            status: string;
        };
        metadata_status: {
            source: string;
            status: string;
        };
        avm_status: {
            source: string;
            status: string;
        };
        repair_status: {
            source: string;
            status: string;
        };
    };
    status: StatusType;
    name: string;
    computedMetrics: {
        condition: {
            [key: string]: number;
        };
        quality: {
            [key: string]: number;
        };
    };
}

interface ModelResult {
    class: string;
    confidence: number;
    annotationType: string;
}

interface ScoreModelResult extends ModelResult {
    score: number;
}

export interface ObjectMaterial {
    type: string;
    confidence: number;
}

interface ObjectModelResult extends ModelResult {
    centroid: {
        x: string;
        y: string;
    };
    materials: ObjectMaterial[];
}

interface ModelItem {
    name: string;
    version: string;
    status: StatusType;
    results: ModelResult[];
}

interface ObjectModelItem extends ModelItem {
    results: ObjectModelResult[];
}

interface ScoreModelItem extends ModelItem {
    results: ScoreModelResult[];
}

export interface PDFDataType {
    imageGroupRawData?: ImageGroupRawType;
    jsonData?: ImageGroupType;
    galleryData?: GalleryItem[];
    damageGalleryData?: GalleryItem[];
    classCount?: any;
    image?: string;
    logo?: string;
    pdfTemplate?: PDFTemplate;
}

export type IndexValuesType = {
    propertyIndex: number[];
    zipIndex: number[];
    countyIndex: number[];
    metroIndex: number[];
};
