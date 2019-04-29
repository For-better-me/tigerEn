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
  publicPath:'./',
  devServer:{
    port:8888,
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
