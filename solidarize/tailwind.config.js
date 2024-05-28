import {nextui} from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#CECECE"},
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: "#FFFFFF",
          primary:"#333333",
          normalText:"#202020",
          backgroundImages:"#3B3B3B"
        },
      },
      dark: {
        colors: {
          background: "#202020",
          primary: "#FF5484",
          normalText:"#FFFFFF",
          backgroundImages:"#ECECEC"
        },
      },
    }
  }),],
}
