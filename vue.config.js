const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  /* App title for html-webpack-plugin */
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].template = require('path').join(__dirname, './public/index.html')
      return args
    })
    
    /* Aggressive chunk splitting for performance */
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 20
        },
        vue: {
          name: 'vue-core',
          test: /[\\/]node_modules[\\/](vue|@vue|pinia)[\\/]/,
          chunks: 'all',
          priority: 30
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true
        }
      }
    })

    /* Remove console.log in production */
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions = args[0].terserOptions || {}
        args[0].terserOptions.compress = {
          ...(args[0].terserOptions.compress || {}),
          drop_console: true,
          drop_debugger: true
        }
        return args
      })
    }
  },

  devServer: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    },
    headers: {
      'Cache-Control': 'no-cache, no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },

  /* Production output config */
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false
  }
})
