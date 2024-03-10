/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '360px',
      xs: '390px',
      dsm: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1350px',
      tall: { raw: '(min-height: 750px)' },
    },
    extend: {
      colors: {
        dark: '#030806',
        lightGreen: '#5FB495',
        brilliantGreen: '#0D9B5C',
        darkGreen: '#105035',
        lighSilver: '#EAEDED',
        darkSilver: '#A0BDB4',
        heroGreen: '#091A19',
        heroBorder: '#234E3E',
        heroBorderLight: 'rgba(35, 78, 62, 0.6)',
        heroText: '#616C6D',
        lossRed: '#ae0700',
        lightRed: '#ae0700',
        lightBlue: '#8CB2BB',
        darkBlue: '#013D57',
        brilliantBlue: '#505BE4',
        lightGrey: '#CBD5E1',
      },
    },
  },
  plugins: [],
};
