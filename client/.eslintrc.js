module.exports = {
  extends: [
    '@astrosat/eslint-config-astrosat',
    'plugin:jsx-a11y/recommended',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/react',
    'plugin:tailwindcss/recommended',
    'plugin:vitest/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['jsx-a11y', 'jest-dom', 'testing-library', 'tailwindcss', 'vitest'],
};
