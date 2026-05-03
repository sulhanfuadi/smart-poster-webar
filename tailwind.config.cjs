module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#f5f5f7',
          surface: '#ffffff',
          elevated: '#fbfbfd',
          text: '#1d1d1f',
          muted: '#6e6e73',
          stroke: '#d2d2d7',
          accent: '#0071e3',
          accentSoft: '#e8f3ff',
          successSoft: '#ecf9f0',
          warningSoft: '#fff6e9',
          dangerSoft: '#ffecec'
        }
      },
      boxShadow: {
        apple: '0 12px 30px rgba(17, 17, 26, 0.06)'
      },
      borderRadius: {
        apple: '20px'
      }
    }
  },
  plugins: [],
};
