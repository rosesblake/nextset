/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Covers all JavaScript and TypeScript files
    "./src/components/**/*.{js,jsx,ts,tsx}", // Specific for components
    "./src/pages/**/*.{js,jsx,ts,tsx}", // Specific for pages
    "./src/styles/**/*.css", // Include any custom CSS
  ],
  theme: {
    extend: {
      colors: {
        nextsetPrimary: "#3B3054", // Dark Indigo
        nextsetAccent: "#FF7F50", // Coral Orange
        nextsetButton: "#7B68EE",
      },
    },
  },
  plugins: [],
};
