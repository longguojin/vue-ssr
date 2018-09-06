const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const {
  VueLoaderPlugin
} = require('vue-loader')

const resolve = p => {
  return path.resolve(__dirname, p)
}

let isProd = process.env.NODE_ENV === 'production';

module.exports = {
  context: __dirname, // string (absolute path!)
  mode: isProd ? "production" : "development", // "production" | "development" | "none"
  
  // For bundle renderer source map support
  devtool: isProd ? false : 'cheap-module-eval-source-map',
  
  output: {
    path: resolve('../dist'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  resolve: {
    // extensions that are used
    extensions: [".js", ".json", ".jsx", ".css",".vue"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('../src'),
      '@ssr': resolve('../ssr'),
      '@store': resolve('../src/store'),
      '@pages': resolve('../src/pages'),
      '@assets': resolve('../src/assets'),
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "vue-style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader",
          options: {
            includePaths: [resolve('../src')]
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            // enable CSS extraction
            extractCSS: isProd
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin(
      [{
        from: resolve('../public'),
        to: resolve('../dist'),
        ignore: [
          '.DS_Store'
        ]
      }]
    )
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
  }
}
