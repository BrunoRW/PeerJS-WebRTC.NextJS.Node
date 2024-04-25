import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      default: {
        50: '#ffffff',
        100: '#f8f8f8',
        200: '#f1f1f1',
        250: '#efefef',
        300: '#e8e8e8',
        400: '#a2a2a2',
        500: '#989898',
        600: '#707070',
        700: '#393939',
        800: '#1B1B1B',
        900: '#000000',
      },
    },
  },
  plugins: [],
};
export default config;
