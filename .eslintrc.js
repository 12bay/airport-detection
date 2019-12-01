module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/warnings',
  ],
  plugins: [],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  globals: {
    process: true,
    use: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
      },
    ],
    'no-console': 1,
    'no-useless-escape': 0,
    'no-useless-catch': 0,
    'no-empty': [
      1,
      {
        allowEmptyCatch: true,
      },
    ],
    'no-unreachable': 1,
    'no-constant-condition': 0,
    'require-atomic-updates': 0,
  },
};
