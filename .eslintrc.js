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
    "no-console":"off",
    "eqeqeq": "off",
    "object-curly-spacing": "off"
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
