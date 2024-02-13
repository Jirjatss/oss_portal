/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        hero: 'url("/assets/imageTop.png")',
      }),

      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
    container: {
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        "semi-xl": "1024px",
        xl: "1240px",
        "2xl": "1240px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    ({ addComponents }) => {
      addComponents({
        ".text-navbar": {
          "@apply font-lato font-semibold text-black": {},
        },
      });
    },
  ],
};
