const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const uglifyPlugin = require('uglifyjs-webpack-plugin');

let uglifyP = new uglifyPlugin();

let htmlP = new htmlPlugin({
    minfy: {
        removeAttributeQuotes:true,
    },
    hash: true,
    template: './demo/index.html',
})

let hotP = new webpack.HotModuleReplacementPlugin();
let bannerP = new webpack.BannerPlugin('gaosc配置');

let optimizeP = new webpack.optimize.CommonsChunkPlugin({
    name:'snapturtle',
    filename:"assets/js/[name]-[hash].js",
    minChunks:2
});

let extractP = new extractTextPlugin('assets/css/[name].css');

let provideP = new webpack.ProvidePlugin({
    React: 'react',
    ReactDOM: 'react-dom',
})


module.exports = {
    devtool: "cheap-module-eval-source-map",
    entry: {
        demo: './demo/demo.js',
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://127.0.0.1:7878/',
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
        },{
            test: /\.(css|postcss)$/,
            // loader: 'css-loader'
            use: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                },{
                    loader: 'postcss-loader'
                }]
            }),
        }, {
            test: /\.(png|jpg|svg|jpeg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    outputPath: 'assets/images/',
                }
            }]
        }]
    },
    plugins: [
        bannerP,
        htmlP,
        uglifyP,
        hotP,
        optimizeP,
        extractP,
        provideP,
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: '7878',
        compress: true,
    }
}