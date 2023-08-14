/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}","node_modules/vue-tailwind-datepicker/**/*.js",],
    theme: {
        extend: {
            fontFamily: {
                jomhuria: ["Jomhuria", '"Regular 400"'],
            },
            colors: {
                text: "#1E1E1E",
                background: "#e1efe1",
                primary: "#a9d1bd",
                secondary: "#ffffff",
                accent: "#0ea093",
                error: "#FF9494",
                "vtd-primary": colors.primary, // Light mode Datepicker color
            },
        },
    },
    plugins: [],
};
