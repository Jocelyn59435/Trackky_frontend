module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      acmesans: ['Acme, sans serif'],
    },
    extend: {
      colors: {
        indigo: {
          // theme('colors.indigo.light')
          light: '#b3bcf5',
          // theme('colors.indigo.DEFAULT')
          DEFAULT: '#5c6ac4',
        },
        grey: {
          DEFAULT: '#F3F1F5',
        },
        darkgrey: {
          DEFAULT: '#716F81',
        },
        bordergrey: {
          DEFAULT: '#dedfdc',
        },
        red: {
          DEFAULT: '#bf1650',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
};
