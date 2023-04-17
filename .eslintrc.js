module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0, // 关闭驼峰命名规则 报错提示为 ！！！multi-word
    'no-unused-vars': 'off', // 关闭定义但未使用的警告
    quotes: [1, 'single'],
    indent: ['off', 2],
    'space-before-function-paren': 0
  }
}
