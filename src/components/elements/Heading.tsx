// External Dependencies
import React from 'react';

// Internal Dependencies
import { FoxyTextStyle, Text } from './';

interface ChildrenProps {
    id?: string;
    children: React.ReactNode;
}

export default function Heading({ id, children }: ChildrenProps) {
    return (
        <Text
            foxyStyle={FoxyTextStyle.SUBHEADING_1}
            textColorClass={'text-foxy-header-normal'}
            id={id}
            className="heading1"
        >
            {children}
        </Text>
    );
}
