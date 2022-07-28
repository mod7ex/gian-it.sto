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
        'bg-purple-600',
        'bg-purple-700',
        'bg-gray-500',
        'bg-gray-200',
        'bg-gray-100',
        'bg-white',
        'bg-indigo-100',
        'bg-indigo-500',
        'bg-indigo-600',
        'bg-indigo-700',
        'bg-gray-100',
        'bg-red-100',
        'bg-blue-100',
        'bg-yellow-100',
        'bg-purple-100',
        'bg-green-100',
        'bg-green-600',
        'bg-green-700',
        'bg-red-500',
        'bg-red-600',
        'bg-red-700',

        'h-24',
        'sm:col-span-1',
        'sm:col-span-2',

        'text-gray-500',
        'text-red-600',
        'text-indigo-800',
        'text-indigo-400',
        'text-gray-800',
        'text-gray-400',
        'text-red-800',
        'text-red-400',
        'text-blue-800',
        'text-blue-400',
        'text-yellow-800',
        'text-yellow-400',
        'text-purple-800',
        'text-purple-400',
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
