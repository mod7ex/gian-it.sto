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
        'text-gray-500',
        'text-red-600',
        'bg-white',
        'h-24',
        'sm:col-span-1',
        'sm:col-span-2',
        'bg-indigo-100',
        'text-indigo-800',
        'text-indigo-400',
        'bg-gray-100',
        'text-gray-800',
        'text-gray-400',
        'bg-red-100',
        'text-red-800',
        'text-red-400',
        'bg-blue-100',
        'text-blue-800',
        'text-blue-400',
        'bg-yellow-100',
        'text-yellow-800',
        'text-yellow-400',
        'bg-purple-100',
        'text-purple-800',
        'text-purple-400',
        'bg-green-100',
        'text-green-800',
        'text-green-400',
        'text-xs',
        'text-sm',
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
