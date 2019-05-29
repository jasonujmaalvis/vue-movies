module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs'
  ],
  // add your custom rules here
  rules: {
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never',
    }],
    'vue/no-v-html': ['never'],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'no-console': ['warn'],
  }
}
