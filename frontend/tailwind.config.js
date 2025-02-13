/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // A nice blue shade
        secondary: "#f8fafc", // Light white-blue for background
      },
    },
  },
  plugins: [],
};
