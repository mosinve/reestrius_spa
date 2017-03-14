var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  node: {
    fs: "empty"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules(?!\/(vue-tables-2|vue-pagination-2))\//
    },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
        {test: /\.scss?$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},          
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
        {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
        {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
        {test: /node_modules[\\\/]vis[\\\/].*\.js$/,
                 loader: 'babel-loader',
                 query: {
                     cacheDirectory: true,
                     presets: ["es2015"],
                     plugins: [
                         "transform-es3-property-literals",
                         "transform-es3-member-expression-literals",
                         "transform-runtime"
                     ]}
        }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'jquery': 'jquery/src/jquery',
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: "inline-source-map",
  plugins: [
  new webpack.NamedModulesPlugin(),
  new webpack.ProvidePlugin({
    $: "jquery",
    jquery: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    Tether: "tether",
    "window.Tether": "tether",
    // Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
    // Button: "exports-loader?Button!bootstrap/js/dist/button",
    // Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
    // Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
    // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
    // //Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
    // Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
    // Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
    // Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
    // Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
    // Util: "exports-loader?Util!bootstrap/js/dist/util",
    Vue:"vue",
  })
]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
