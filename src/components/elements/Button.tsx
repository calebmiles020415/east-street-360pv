// External Dependencies
import React from 'react';
import cx from 'classnames';

interface TextProps {
    className?: string;
    children: React.ReactNode;
    bgColorClass?: string;
    textClass?: string;
    bgHoverClass?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler;
}

export function Button(props: TextProps) {
    const {
        bgColorClass = 'bg-foxy-button',
        bgHoverClass = 'hover:bg-foxy-hovered-button hover:bg-foxy-hovered-button disabled:hover:bg-foxy-button',
        textClass = 'text-foxy-button-text',
        disabled,
        onClick
    } = props;

    const formAttributes = {};

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            {...formAttributes}
            className={cx(
                'flex flex-row px-2 items-center justify-center h-10 rounded font-semibold text-center pointer transition-all duration-150 ease-out disabled:text-black',
                bgColorClass,
                textClass,
                bgHoverClass,
                props.className
            )}
        >
            {props.children}
        </button>
    );
}
