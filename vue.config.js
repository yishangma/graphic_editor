const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // // 部署应用包时的基本URL，置空使用相对路径
  publicPath: process.env.IS_BUILD_LIB ? '/' : '/Origin-Editor/',
  outputDir: 'dist', // 打包输出目录
  // 静态资源目录
  assetsDir: '',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
