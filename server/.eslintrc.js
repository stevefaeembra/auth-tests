module.exports = {
  extends: ['@astrosat/eslint-config-astrosat'],
  // plugins: ['jsx-a11y', 'jest-dom', 'testing-library', 'tailwindcss'],
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   sourceType: 'module',
  //   project: './tsconfig.json',
  //   tsconfigRootDir: '.',
  // },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    // '@typescript-eslint/consistent-type-imports': [
    //   'error',
    //   {
    //     prefer: 'type-imports',
    //   },
    // ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './src']],
        // extensions: ['.ts'],
      },
      typescript: {},
    },
  },
};
