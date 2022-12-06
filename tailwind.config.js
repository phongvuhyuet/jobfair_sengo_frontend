/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/common/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    'node_modules/react-toastify/dist/*.css',
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  // mui https://mui.com/material-ui/guides/interoperability/#tailwind-css
  corePlugins: {
    preflight: false,
  },
  important: '#__next',
}
