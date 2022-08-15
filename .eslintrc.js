module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb', 'plugin:node/recommended'],
  plugins: ['node'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'node/no-unpublished-require': 0,
    'class-methods-use-this': 'off',
    'node/no-unsupported-features/es-syntax': 0,
    'consistent-return': 'off',
    'func-names': 'off',
    'no-unused-vars': 0,
  },
};
