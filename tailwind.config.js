/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  important: true,
  theme: {
    fontSize: {
      'xs': ['var(--theme-size--xs)', {
        lineHeight: '1.5',
      }],
      'sm': ['var(--theme-size--sm)', {
        lineHeight: '1.5',
      }],
      'md': ['var(--theme-size--md)', {
        lineHeight: '1.5',
      }],
      'lg': ['var(--theme-size--lg)', {
        lineHeight: '1.5',
      }],
      'xl': ['var(--theme-size--xl)', {
        lineHeight: '1.4',
      }],
      '2xl': ['var(--theme-size--2xl)', {
        lineHeight: '1.4',
      }],
      '3xl': ['var(--theme-size--3xl)', {
        lineHeight: '1.3',
      }],
      '4xl': ['var(--theme-size--4xl)', {
        lineHeight: '1.3',
      }],
      '5xl': ['var(--theme-size--5xl)', {
        lineHeight: '1.3',
      }],
    },
    fontFamily: {
      'primary': ['var(--ff-primary)'],
      'fa': '"Font Awesome 5 Pro"',
    },
    borderRadius: {
      'none': '0',
      'sm': 'min(max(0.25rem,1vw),5px)',
      DEFAULT: 'min(max(0.6rem,0.4vw),12px)',
      'md': 'min(max(0.85rem,5vw),16px)',
      'lg': 'min(max(1.5rem,6vw),30px)',
      'xl': 'min(max(2.6rem,9.5vw),42px)',
      'full': '9999px',
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