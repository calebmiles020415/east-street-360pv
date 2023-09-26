// External Dependencies
import { View } from '@react-pdf/renderer';
import cx from 'classnames';
import React from 'react';

// Internal Dependencies
import { tw } from '../../../styles/pdfStyle';

interface ChildrenProps {
    children?: React.ReactNode;
    containerStyle?: string;
    printable?: boolean;
}

export const Container = ({ children, containerStyle, printable = true }: ChildrenProps) => {
    if (printable)
        return <View style={tw(`w-11/12 pt-8 pb-6 mx-auto ${containerStyle}`)}>{children}</View>;
    return <div className={cx('w-11/12 pt-8 pb-6 m-auto', containerStyle)}>{children}</div>;
};
