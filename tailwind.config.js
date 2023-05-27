/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-100": "#ff7eb0",
        "primary-500": "#f6157c",
        "primary-900": "#bd124f",
        "secondary-100": "#5397ff",
        "secondary-500": "#0953fa",
        "secondary-900": "#063bbf",
        "background-500": "#121212",
        "background-700": "#0b0b0b",
        "background-900": "#040404",
        "text-100": "#f2f2f2",
        "text-500": "#e0e0e0",
        "text-900": "#c0c0c0",
      },
    },
  },
  plugins: [],
};
