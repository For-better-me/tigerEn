const version = 1.20;
module.exports = {
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `js/[name].${version}.js`,
      chunkFilename: `js/[name].${version}.js`
    },
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  publicPath:'/',//history不要设置成'./'https://www.jianshu.com/p/12786a8ec70c,不然js会有两个文件获取不到，报错unexpected '<'
  devServer:{
    port:80,
    disableHostCheck: true,
    proxy: {
      '/apis': {
        target: 'http://m.vipqm.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            '^/apis': ''   //需要rewrite的,
        }  
      }
    }
  }
}
