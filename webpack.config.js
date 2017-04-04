var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

module.exports = {
    entry: './src/main.js',
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
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                // include: [
                //     fs.realpath('node_modules', 'vue/dist')
                //     // fs.realpath('node_modules', 'bootstrap-vue/dist'),
                // ],
            },
            {
                // if you use vue.common.js, you can remove it
                test: /\.esm.js$/,
                loader: 'babel-loader',
                exclude: /node_modules\/(?!vue(?!\W))/,
                // include: [
                //     path.resolve('node_modules', 'vue/dist'),
                //     path.resolve('node_modules', 'bootstrap-vue/dist'),
                // ]
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
            {test: /\.css?$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
            {
                test: /node_modules[\\\/]vis[\\\/].*\.js$/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ["es2015"],
                    plugins: [
                        "transform-es3-property-literals",
                        "transform-es3-member-expression-literals",
                        "transform-runtime"
                    ]
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: "warning"
    },
    devtool: "inline-source-map",
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            Tether: "tether",
            "window.Tether": "tether",
            Vue: "vue",
            'window.Vue': 'vue',
            VueResource: "exports-loader?plugin!vue-resource/dist/vue-resource.es2015",
            BootstrapVue: "exports-loader?VuePlugin!bootstrap-vue/dist/bootstrap-vue.esm",
            Vuex: "exports-loader?index_esm!vuex/dist/vuex.esm",
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