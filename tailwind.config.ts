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
        popup: "popup 0.6s ease-in forwards",
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
        popup: {
          "0%": {},
          "70%": {
            "-webkit-transform": "scale(1.1)",
            transform: "scale(1.1)",
            opacity: "0.8",
            "-webkit-animation-timing-function": "ease-out",
            "animation-timing-function": "ease-out",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
