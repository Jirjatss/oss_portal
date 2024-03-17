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
        hero: 'url("/assets/images/imageTop.png")',
        "hero-mobile": 'url("/assets/images/imageTopMobile.jpg")',
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
    require("daisyui"),
    ({ addComponents }) => {
      addComponents({
        ".text-navbar": {
          "@apply font-lato font-semibold text-black": {},
        },
        ".text-input": {
          "@apply border-b-[1px] border-[#F0F0F0] focus:outline-none pb-1 text-[18px]  bg-transparent":
            {},
        },
        ".text-label": {
          "@apply text-[16px] font-thin text-[#646464] mb-1": {},
        },
        ".text-headForm": {
          "@apply text-[28px] font-bold": {},
        },
      });
    },
  ],
};
