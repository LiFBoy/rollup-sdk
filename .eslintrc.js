module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'eslint:recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: [1, 'single'],
    semi: ['error', 'always'],
    'no-constant-condition': 0,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
};
