module.exports = {
  mode: 'jit',
  content: [
    './src/*.{js,jsx,ts,tsx,html,css}',
    './src/views/**/*.{js,jsx,ts,tsx,html,css}',
    './src/addons/**/*.{js,jsx,ts,tsx,html,css}',
    'index.html'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')]
};
