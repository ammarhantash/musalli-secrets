import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Musalli Secrets brand palette — "Hidden vs. Shown".
        ink: "#0B0B0F", // near-black — the absolute of mystery
        indigo: "#1C1B3A", // depth of the hidden
        "indigo-deep": "#13122A",
        rosegold: "#B76E79", // warmth of revelation
        "rosegold-soft": "#D9A7A1",
        silver: "#C7C7CC", // purity of craft
        smoke: "#8A8A99",
        offwhite: "#F4F2EC",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "Cambria", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
