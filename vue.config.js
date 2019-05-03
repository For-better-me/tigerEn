module.exports = {
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
        target: 'https://www.tjitfw.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            '^/apis': ''   //需要rewrite的,
        }  
      }
    }
  }
}
