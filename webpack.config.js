var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: './src/components/gallery.jsx',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            },
        ]
    },
    plugins: [
        new CommonsChunkPlugin('init.js')
    ]
};