// External Dependencies
import React from 'react';
import cx from 'classnames';
import { Text as PDFText } from '@react-pdf/renderer';

// Internal Dependencies
import { textColors, tw } from '../../../styles/pdfStyle';

export enum FoxyTextStyle {
    DEFAULT = 'DEFAULT',
    HEADING_1 = 'HEADING_1',
    HEADING_2 = 'HEADING_2',
    HEADING_3 = 'HEADING_3',
    SUBHEADING_1 = 'SUBHEADING_1',
    SUBHEADING_2 = 'SUBHEADING_2',
    BODY_1 = 'BODY_1',
    BODY_2 = 'BODY_2',
    BODY_3 = 'BODY_3',
    BODY_4 = 'BODY_4',
    BODY_5 = 'BODY_5',
    BUTTON_1 = 'BUTTON_1',
    BUTTON_2 = 'BUTTON_2',
    BUTTON_3 = 'BUTTON_3'
}

const foxyTextStyleValues = {
    DEFAULT: { size: 'text-base', weight: 'font-normal' },
    HEADING_1: {
        color: 'text-foxy-obsidian-gray',
        size: 'text-4xl',
        weight: 'font-semibold'
    },
    HEADING_2: {
        color: 'text-foxy-obsidian-gray',
        size: 'text-3xl',
        weight: 'font-semibold'
    },
    HEADING_3: {
        color: 'text-foxy-obsidian-gray',
        size: 'text-2xl',
        weight: 'font-semibold'
    },
    SUBHEADING_1: {
        color: 'text-foxy-obsidian-gray',
        size: 'text-xl',
        weight: 'font-semibold'
    },
    SUBHEADING_2: {
        color: 'text-foxy-obsidian-gray',
        size: 'text-lg',
        weight: 'font-semibold'
    },
    BODY_1: {
        color: 'text-foxy-mid-blue',
        size: 'text-lg',
        weight: 'font-normal'
    },
    BODY_2: {
        color: 'text-foxy-mid-blue',
        size: 'text-base',
        weight: 'font-normal'
    },
    BODY_3: {
        color: 'text-foxy-mid-blue',
        size: 'text-sm',
        weight: 'font-normal'
    },
    BODY_4: {
        color: 'text-foxy-mid-blue',
        size: 'text-xs',
        weight: 'font-normal'
    },
    BODY_5: {
        color: 'text-foxy-mid-blue',
        size: 'text-sm',
        weight: 'font-normal'
    },
    BUTTON_1: {
        color: 'text-font-white-primary',
        size: 'text-base',
        weight: 'font-normal'
    },
    BUTTON_2: {
        color: 'text-font-white-primary',
        size: 'text-sm',
        weight: 'font-normal'
    },
    BUTTON_3: {
        color: 'text-font-white-primary',
        size: 'text-xs',
        weight: 'font-normal'
    }
};

interface TextProps {
    style?: React.CSSProperties;
    id?: string;
    className?: string;
    children: React.ReactNode;
    textColorClass?: string;
    fontWeight?: string;
    size?: string;
    foxyStyle?: FoxyTextStyle;
    printable?: boolean;
}

export function Text(props: TextProps) {
    const { printable = true } = props;
    const {
        style,
        id,
        className,
        textColorClass,
        size,
        fontWeight,
        foxyStyle = FoxyTextStyle.DEFAULT
    } = props;
    if (printable) {
        return (
            <PDFText
                style={{
                    ...tw(
                        cx(
                            'antialiased',
                            textColorClass ||
                                foxyTextStyleValues?.[foxyStyle]?.color ||
                                'text-foxy-normal-light-gray',
                            size || foxyTextStyleValues?.[foxyStyle].size || 'text-base',
                            fontWeight || foxyTextStyleValues?.[foxyStyle].weight || 'font-normal',
                            className
                        )
                    ),
                    color: textColors?.[textColorClass]
                }}
            >
                {props.children}
            </PDFText>
        );
    }
    return (
        <div
            id={id}
            style={style}
            className={cx(
                'antialiased',
                textColorClass ||
                    foxyTextStyleValues?.[foxyStyle]?.color ||
                    'text-foxy-text-dark-gray',
                size || foxyTextStyleValues?.[foxyStyle].size || 'text-base',
                fontWeight || foxyTextStyleValues?.[foxyStyle].weight || 'font-normal',
                className
            )}
        >
            {props.children}
        </div>
    );
}
