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
          green: "#22c55e",
          "green-dark": "#16a34a",
          orange: "#f97316",
          "orange-dark": "#ea580c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
