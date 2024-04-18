const path = require('path');

module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    admin: {
      entry: 'src/admin.js',
      template: 'public/admin.html',
      filename: 'admin.html',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': path.resolve(__dirname, 'public'),
        '@': path.resolve(__dirname, 'src'), 
        '@components': path.resolve(__dirname, 'src/components'), 
        '@api': path.resolve(__dirname, 'src/api'), 
        '@assets': path.resolve(__dirname, 'src/assets'), 
        '@services': path.resolve(__dirname, 'src/services'), 
        // Add alias for vue to use the appropriate version
        'vue$': 'vue/dist/vue.esm-bundler.js'
      },
    },
  },
};
