import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#a8e6a3",
          "green-dark": "#8fda8a",
          orange: "#f97316",
          "orange-dark": "#ea580c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
