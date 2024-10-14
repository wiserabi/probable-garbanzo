/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'vuetify',
    '@vue/eslint-config-typescript',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    'vue/no-mutating-props': 'off',
    'vue/no-use-v-if-with-v-for': ['error', {
      allowUsingIterationVar: true,
    }],
    semi: [2, 'always'],
  },
};
