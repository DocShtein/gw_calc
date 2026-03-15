/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        telegram: {
          background: 'var(--tg-theme-bg-color, #0f0f0f)',
          text: 'var(--tg-theme-text-color, #ffffff)',
          hint: 'var(--tg-theme-hint-color, #a0a0a0)',
          link: 'var(--tg-theme-link-color, #61dafb)',
          button: 'var(--tg-theme-button-color, #2481cc)',
          'button-text': 'var(--tg-theme-button-text-color, #ffffff)',
          secondary: 'var(--tg-theme-secondary-bg-color, #1b1b1b)'
        }
      },
      borderRadius: {
        'screen': '24px'
      }
    }
  },
  plugins: []
};

