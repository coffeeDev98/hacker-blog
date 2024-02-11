import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        firacode: ["var(--font-firacode)"],
      },
      colors: {
        // light
        cyan: "#92C7CF",
        aqua: "#AAD7D9",
        "vista-white": "#FBF9F1",
        satin: "#E5E1DA",
        // dark
        gunmetal: "#352F44",
        comet: "#5C5470",
        lily: "#B9B4C7",
        linen: "#FAF0E6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        typewriter: "typewriter 1s steps(11) infinite",
        caret:
          "typewriter 1s steps(11) infinite, blink 1s steps(11) infinite 1s",
      },
      keyframes: {
        typewriter: {
          to: { left: "100%" },
        },
        blink: {
          "0%": {
            opacity: "0",
          },
          "0.1%": {
            opacity: "1",
          },
          "50%": {
            opacity: "1",
          },
          "50.1%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
