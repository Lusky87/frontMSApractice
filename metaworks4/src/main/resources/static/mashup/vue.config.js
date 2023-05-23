// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  configureWebpack: {
    // Set up all the aliases.
    resolve: {
      alias: require("./aliases.config").webpack
    }
    // ,externalsType: 'script',
    // externals: {
    //   vue: ['https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js', 'Vue']
    // }
  },
  chainWebpack: config => {
    config.module
        .rule('vue')
        .use('vue-loader')
        .tap(options => ({
          ...options,
          compilerOptions: {
            // ion-으로 시작하는 모든 태그를 사용자 지정 앨리먼트로 취급합니다.
            isCustomElement: tag => tag.include('-')
          }
        }))
  },
  devServer: {
    // proxy : 'http://localhost:5003'
    proxy: {
      "/vue/*": {
        "target":'http://localhost:5003',
        "pathRewrite": {'^/vue':''},
        "changeOrigin":true,
        "secure":false,
      },
      "/react/*": {
        "target":'http://localhost:5006',
        "pathRewrite": {'^/react':''},
        "changeOrigin":true,
        "secure":false,
      }
    }
  },
  lintOnSave:false,
  transpileDependencies: [
    'vuetify'
  ]
};
