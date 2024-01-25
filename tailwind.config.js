/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  important: true,
  theme: {
    fontSize: {
      'xs': ['min(max(0.46rem,2vw),10px)', {
        lineHeight: '1.5',
      }],
      'sm': ['min(max(0.6rem,0.6vw),12px)', {
        lineHeight: '1.5',
      }],
      'md': ['min(max(0.7rem,3vw),14px)', {
        lineHeight: '1.5',
      }],
      'lg': ['min(max(0.8rem,3vw),15px)', {
        lineHeight: '1.5',
      }],
      'xl': ['min(max(0.8rem,4vw),18px)', {
        lineHeight: '1.4',
      }],
      '2xl': ['min(max(1.1rem,5vw),21px)', {
        lineHeight: '1.4',
      }],
      // '3xl': ['min(max(1.32rem,5.5vw),24px)', {
      '3xl': ['min(max(1.3rem,5.5vw),24px)', {
        lineHeight: '1.3',
      }],
      '4xl': ['min(max(1.8rem,7.5vw),34px)', {
        lineHeight: '1.3',
      }],
      '5xl': ['min(max(2.6rem,9.5vw),42px)', {
        lineHeight: '1.3',
      }],
    },

    fontFamily: {
      // 'sans': ['ui-sans-serif', 'system-ui', ...],
      // 'serif': ['ui-serif', 'Georgia', ...],
      // 'mono': ['ui-monospace', 'SFMono-Regular', ...],
      // 'display': ['Oswald', ...],
      'primary': ['var(--ff-primary)'],
    },
    borderRadius: {
      'none': '0',
      'sm': '5px',
      DEFAULT: '12px',
      'md': '16px',
      'lg': '20px',
      'xl': '45px',
      'full': '9999px',
      'large': '12px',
    },
    extend: {
      colors: {
        "primary": "#f30292",
        "primary-50": "#9a6c88",
        "primary-dark": "#331630",
        "secondary": "#65265E",
        "card-bg": "#814067",
        "input-bg": "#783c60",
      }
    },
  },
  plugins: [],
}