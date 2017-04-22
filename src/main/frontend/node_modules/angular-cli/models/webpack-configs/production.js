"use strict";
var path = require('path');
var webpack = require('webpack');
var compression_plugin_1 = require('../../lib/webpack/compression-plugin');
exports.getProdConfig = function (wco) {
    var projectRoot = wco.projectRoot, buildOptions = wco.buildOptions, appConfig = wco.appConfig;
    var appRoot = path.resolve(projectRoot, appConfig.root);
    return {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                mangle: { screw_ie8: true },
                compress: { screw_ie8: true, warnings: buildOptions.verbose },
                sourceMap: buildOptions.sourcemap
            }),
            new compression_plugin_1.CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.html$|\.css$/,
                threshold: 10240
            })
        ]
    };
};
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-configs/production.js.map