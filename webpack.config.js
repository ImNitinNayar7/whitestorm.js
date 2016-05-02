/**
 * Creator: yeliex
 * Project: whitestorm.js
 * Description:
 */
const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: {
        "index": [
            'webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server',
            "./demo.js"
        ]
    },
    output: {
        path: path.join(__dirname, 'assets', 'build'),
        publicPath: "/assets/build/",
        filename: "[name].js"
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loaders: ["babel"]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};