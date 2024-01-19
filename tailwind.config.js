/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      // 'sans': ['ui-sans-serif', 'system-ui', ...],
      // 'serif': ['ui-serif', 'Georgia', ...],
      // 'mono': ['ui-monospace', 'SFMono-Regular', ...],
      // 'display': ['Oswald', ...],
      'primary': ['var(--ff-primary)'],
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '12px',
      'md': '16px',
      'lg': '20px',
      'full': '9999px',
      'large': '12px',
    },
    extend: {
      colors: {
        "primary": "#f30292",
        "primary-50": "#9a6c88",
        "primary-dark": "#331630",
        "secondary": "#65265E",
      }
    },
  },
  plugins: [],
}