const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = merge(base, {
  target: "web", // enum
  entry: {
     // Point entry to your app's client entry file
    client: '../ssr/entry-client.js',

    //babel polifill
    polifil: "@babel/polyfill"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        VUE_ENV: '"client"'
      }
    }),

    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin(),
  ],
  optimization: { //split chunks, only needs in client config
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },

  node: {
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
})
