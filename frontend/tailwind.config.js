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
        nextsetPrimary: "#232330", // Muted Deep Navy
        nextsetAccent: "#D4A97A", // Lighter Warm Taupe for Better Contrast
        nextsetButton: "#6B7480", // Softer Slate Gray for Harmony
      },
    },
  },
  plugins: [],
};
