module.exports = {
  purge: {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
    ],

    options: {
      safelist: [
        'bg-indigo-500',
        'bg-blue-500',
        'bg-red-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-purple-500',
        'bg-gray-500',
        'bg-gray-200',
        'bg-gray-100',
        'bg-white',
        'h-24',
      ],
    },
  },

  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {},
  },

  variants: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
