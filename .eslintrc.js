module.exports = {
  globals: { wx: true },
  root: true,
  env: {
    node: true
  },
  'extends': [
    '@megalo/standard'
  ],
  "rules": {
    "no-console":"off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
