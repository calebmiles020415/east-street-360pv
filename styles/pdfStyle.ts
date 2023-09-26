// External Dependencies
import createTw from 'react-pdf-tailwind';

// Internal Dependencies;
import myConfig from '../tailwind.config.js';

const config = {
    ...myConfig,
    theme: {
        ...myConfig.theme,
        extend: {
            ...myConfig.theme.extend,
            colors: {
                ...myConfig.theme.extend.colors,
                'foxy-header-grad-start': '#213e3d',
                'foxy-header-grad-end': '#477d77',
                'foxy-index-orange': '#f5f5f5',
                'foxy-index-light-orange': '#fad187',
                'foxy-index-light-green': '#c2d1b5',
                'foxy-index-light-blue': '#73a3a8',
                'foxy-index-dark-blue': '#5393d8',
                'foxy-header-normal': '#2b423f',
                'foxy-subheader-normal': '#477d77',
                'foxy-normal-dark-gray': '#333333',
                'foxy-normal-light-gray': '#f5f5f5',
                'foxy-index-header': '#ff7d47',
                'foxy-table': '#203230',
                'foxy-table-header': '#2b423f',
                'foxy-table-footer': '#477d77',
                'foxy-table-light-green': '#c2d1b5',
                'foxy-gallery-title': '#ff7d47',
                'foxy-value': '#E0E5E5',
                'foxy-footer': '#343c3c',
                'foxy-table-text': '#4B5563',
                'foxy-section-header': '#ea580c'
            }
        }
    }
};

export const tw = createTw(config);

export const textColors = {
    'foxy-header-normal': '#2b423f',
    'foxy-subheader-normal': '#477d77',
    'foxy-normal-dark-gray': '#333333',
    'foxy-normal-light-gray': '#f5f5f5',
    'foxy-section-header': '#ea580c',
    'foxy-table': '#203230',
    'foxy-footer': '#343c3c',
    'foxy-index-light-green': '#c2d1b5',
    'foxy-forest-green': '#2B423F',
    'foxy-mid-green': '#547C77',
    'foxy-obsidian-gray': '#21262B',
    'foxy-table-text': '#4B5563',
    'foxy-score-normal': '#c8a104',
    'foxy-score-damage': '#b0413e'
};
