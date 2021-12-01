/* eslint-disable no-undef */
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // fontSize: {
    //   xs: ['0.4rem', { lineHeight: '1rem' }],
    //   sm: ['0.7rem', { lineHeight: '1.25rem' }],
    //   base: ['0.8rem', { lineHeight: '1.5rem' }],
    //   lg: ['0.9rem', { lineHeight: '1.75rem' }],
    //   xl: ['1.1rem', { lineHeight: '1.75rem' }],
    //   '2xl': ['1.5rem', { lineHeight: '2rem' }],
    //   '3xl': ['1.6rem', { lineHeight: '2.25rem' }],
    //   '4xl': ['1.7rem', { lineHeight: '2.5rem' }],
    //   '5xl': ['1.8rem', { lineHeight: '1' }],
    //   '6xl': ['2rem', { lineHeight: '1' }],
    //   '7xl': ['2.4rem', { lineHeight: '1' }],
    //   '8xl': ['3.2rem', { lineHeight: '1' }],
    //   '9xl': ['4.2rem', { lineHeight: '1' }],
    //   'label': ['14px', { lineHeight: '1' }]
    // },
    extend: {
      colors: {
        mainbg: '#F3F2F7',
        third: {
          DEFAULT: '#E5E5E5'
        },
        secondary: {
          DEFAULT: '#F0B71C'
        },
        yellow: {
          DEFAULT: '#F0B71C',
          label: '#FFF9E8'
        },
        black: {
          DEFAULT: '#464255',
          darkBlack: '#000'
        },
        blue: {
          text: '#2F80ED',
          dark: '#3110FF',
          icon: '#2499FF'
        },
        red: {
          DEFAULT: '#FF0000'
        },
        tag: {
          draft: '#0088FF',
          pending: '#F0B71C',
          complete: '#0D7718',
          error: '#FF0000',
          new: '#EF15D9'
        },
        gray: {
          5: '#A3A3A3',
          2: "#626262"
        },
        dark: {
          DEFAULT: '#464255',
          neutral: '#16232C'
        }
      },
      fontFamily: {
        DEFAULT: ['Barlow']
      }
    },
    fontFamily: {
      DEFAULT: ['Barlow'],
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      display: ['Oswald'],
      body: ['"Open Sans"'],
      barlow: ['Barlow']
    },
  },
  variants: {},
  plugins: []
}
