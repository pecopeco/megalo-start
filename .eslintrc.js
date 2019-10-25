module.exports = {
  globals: { wx: true },
  root: true,
  env: {
    node: true
  },
  'extends': [
    '@megalo/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}