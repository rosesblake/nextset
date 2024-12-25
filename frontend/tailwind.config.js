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
        nextsetPrimary: "#64748B",
        nextsetSecondary: "#FACC15",
      },
    },
  },
  plugins: [],
};
