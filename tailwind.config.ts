import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#f3ce00",
          brown: "#5c3921",
          white: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
export default config;
