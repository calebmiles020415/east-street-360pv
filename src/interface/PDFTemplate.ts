export interface SubComponent {
    display: boolean;
    settings?: {
        [key: string]: string;
    };
}

export interface Component extends SubComponent {
    subComponents: {
        [key: string]: SubComponent;
    };
}

export interface PDFTemplate {
    templateSettings: {
        head: {
            display: boolean;
            settings: any;
            subComponents: {
                headLogo: SubComponent;
                headTitle: SubComponent;
                headSubTitle: SubComponent;
            };
        };
        property: Component;
        FIG: Component;
        comp: Component;
        scores: Component;
        photos: Component;
        damage: Component;
        reno: Component;
    };
}
