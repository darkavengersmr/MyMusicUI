const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    compress: false,
    proxy: {
      '^/': {
        //target: 'http://192.168.32.64:84',
        target: 'http://127.0.0.1:8000',
        ws: false,
        changeOrigin: true
      }
    }    
  }
})
