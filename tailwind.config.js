const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tw-elements/dist/js/**/*.js"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans]
            },
            colors: {
                // button colors
                "foxy-button": "#477d77",
                "foxy-hovered-button": "#39605C",
                "foxy-overlay-button": "#B5CBC9",
                "foxy-button-text": "#fff",
                'foxy-mid-green': '#547C77',
                // primary
                "white-primary": "#fff",
                "black-primary": "#000",
                "foxy-dark-green": "#2b4240",
                "foxy-obsidian-gray": "#21262B",
                "foxy-obsidian-grey": "#21262B",
                "foxy-orange": "#ff7d47",
                "foxy-gray-matter": "#f5f6f6",
                "foxy-grey-matter": "#f5f6f6",
                "foxy-cadet-blue": "#75A3A7",

                // secondary
                "foxy-myrtle-green": "#477d77",
                "foxy-forest-green": "#2B423F",
                "foxy-meadow-yellow": "#FAD187",
                "foxy-sage-green": "#C2D1B5",
                "foxy-cadet-blue": "#73A3A8",
                "foxy-mist-gray": "#DDDDDD",
                "foxy-mist-grey": "#DDDDDD",
                // text colors
                "foxy-mid-blue": "#96A1A0",
                "foxy-light-grey": "#F5F5F5",
                // extra colors added to the style guide
                "foxy-dark-green": "#203230",
                "foxy-teal": "#39605C",
                "foxy-dark-mid-blue": "#788281",
                "foxy-mid-blue": "#96A1A0",
                "foxy-light-mid-blue": "#cad0cf",
                "foxy-light-teal": "#e4eceb",
                "foxy-mid-sage-green": "#D9E8CF",
                "foxy-light-sage-green": "#ECF4E7",
                "foxy-dark-orange": "#D8683A",
                "foxy-dark-grey": "#333333",
                "foxy-score-normal": '#c8a104',
                "foxy-score-damage": "#b0413e",
                "foxy-header-grad-start": "var(--bg-header-grad-start)",
                "foxy-header-grad-end": "var(--bg-header-grad-end)",
                "foxy-index-orange": "var(--bg-index-orange)",
                "foxy-index-light-orange": "var(--bg-index-light-orange)",
                "foxy-index-light-green": "var(--bg-index-light-green)",
                "foxy-index-light-blue": "var(--bg-index-light-blue)",
                "foxy-index-dark-blue": "var(--bg-index-dark-blue)",
                "foxy-header-normal": "var(--text-heading)",
                "foxy-subheader-normal": "var(--text-subheading)",
                "foxy-normal-dark-gray": "var(--text-normal-dark-gray)",
                "foxy-normal-light-gray": "var(--text-normal-light-gray)",
                "foxy-index-header": "var(--text-index-header)",
                "foxy-table": "var(--text-table)",
                "foxy-table-header": "var(--text-heading)",
                "foxy-table-footer": "var(--text-subheading)",
                "foxy-table-light-green": "var(--bg-index-light-green)",
                "foxy-gallery-title": "var(--bg-gallery-title)",
                "foxy-footer": "var(--bg-footer)"
            },
            borderRadius: {
                DEFAULT: "5px",
                sm: "7px"
            },
            width: {
                21: "86px"
            },
            boxShadow: {
                DEFAULT: "0 0 20px rgba(202, 208, 207)"
            }
        },
        fontSize: {
            xs: ["12px", "18px"],
            sm: ["13px", "20px"],
            base: ["16px", "30px"],
            md: ["16px", "28px"],
            lg: ["20px", "30px"],
            xl: ["25px", "35px"],
            "2xl": ["30px", "40px"],
            "3xl": ["40px", "50px"],
            "4xl": ["50px", "68px"],
            button: ["14px", "20px"]
        }
    },
    plugins: [require("@tailwindcss/forms"), require("tw-elements/dist/plugin")]
};