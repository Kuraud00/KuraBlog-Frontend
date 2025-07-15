/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        round: "0px 0px 15px 5px rgba(0,0,0,0.1)",
      },
    },
    fontFamily: {
      wdxl: ["WDXL Lubrifont SC, sans-serif"],
      roboto: ["Roboto, sans-serif"],
      noto: ["Noto Sans SC, sans-serif"],
    },
  },
  plugins: [],
};
