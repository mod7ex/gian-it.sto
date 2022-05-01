module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    // "eslint:recommended",
    'plugin:vue/essential',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'object-curly-newline': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'max-len': 'off',
    'consistent-return': 'off',
    'no-unused-expressions': 'off',
    'no-bitwise': 'off',
    // 'no-console': 'off',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
  },
};
