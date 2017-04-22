"use strict";
var webpack = require('webpack');
var path = require('path');
var glob_copy_webpack_plugin_1 = require('../../plugins/glob-copy-webpack-plugin');
var package_chunk_sort_1 = require('../../utilities/package-chunk-sort');
var base_href_webpack_1 = require('@angular-cli/base-href-webpack');
var utils_1 = require('./utils');
var autoprefixer = require('autoprefixer');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SilentError = require('silent-error');
/**
 * Enumerate loaders and their dependencies from this file to let the dependency validator
 * know they are used.
 *
 * require('source-map-loader')
 * require('raw-loader')
 * require('script-loader')
 * require('json-loader')
 * require('url-loader')
 * require('file-loader')
 */
function getCommonConfig(wco) {
    var projectRoot = wco.projectRoot, buildOptions = wco.buildOptions, appConfig = wco.appConfig;
    var appRoot = path.resolve(projectRoot, appConfig.root);
    var nodeModules = path.resolve(projectRoot, 'node_modules');
    var extraPlugins = [];
    var extraRules = [];
    var entryPoints = {};
    // figure out which are the lazy loaded entry points
    var lazyChunks = utils_1.lazyChunksFilter(utils_1.extraEntryParser(appConfig.scripts, appRoot, 'scripts').concat(utils_1.extraEntryParser(appConfig.styles, appRoot, 'styles')));
    if (appConfig.main) {
        entryPoints['main'] = [path.resolve(appRoot, appConfig.main)];
    }
    if (appConfig.polyfills) {
        entryPoints['polyfills'] = [path.resolve(appRoot, appConfig.polyfills)];
    }
    // determine hashing format
    var hashFormat = utils_1.getOutputHashFormat(buildOptions.outputHashing);
    // process global scripts
    if (appConfig.scripts.length > 0) {
        var globalScripts = utils_1.extraEntryParser(appConfig.scripts, appRoot, 'scripts');
        // add entry points and lazy chunks
        globalScripts.forEach(function (script) {
            var scriptPath = "script-loader!" + script.path;
            if (script.lazy) {
                lazyChunks.push(script.entry);
            }
            entryPoints[script.entry] = (entryPoints[script.entry] || []).concat(scriptPath);
        });
    }
    if (buildOptions.vendorChunk) {
        extraPlugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: function (module) { return module.resource && module.resource.startsWith(nodeModules); }
        }));
    }
    // process environment file replacement
    if (appConfig.environments) {
        if (!('source' in appConfig.environments)) {
            throw new SilentError("Environment configuration does not contain \"source\" entry.");
        }
        if (!(buildOptions.environment in appConfig.environments)) {
            throw new SilentError("Environment \"" + buildOptions.environment + "\" does not exist.");
        }
        extraPlugins.push(new webpack.NormalModuleReplacementPlugin(
        // This plugin is responsible for swapping the environment files.
        // Since it takes a RegExp as first parameter, we need to escape the path.
        // See https://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
        new RegExp(path.resolve(appRoot, appConfig.environments['source'])
            .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')), path.resolve(appRoot, appConfig.environments[buildOptions.environment])));
    }
    // process asset entries
    if (appConfig.assets) {
        extraPlugins.push(new glob_copy_webpack_plugin_1.GlobCopyWebpackPlugin({
            patterns: appConfig.assets,
            globOptions: { cwd: appRoot, dot: true, ignore: '**/.gitkeep' }
        }));
    }
    if (buildOptions.progress) {
        extraPlugins.push(new ProgressPlugin({ profile: buildOptions.verbose, colors: true }));
    }
    return {
        devtool: buildOptions.sourcemap ? 'source-map' : false,
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [nodeModules],
        },
        resolveLoader: {
            modules: [nodeModules]
        },
        context: projectRoot,
        entry: entryPoints,
        output: {
            path: path.resolve(projectRoot, buildOptions.outputPath),
            publicPath: buildOptions.deployUrl,
            filename: "[name]" + hashFormat.chunk + ".bundle.js",
            sourceMapFilename: "[name]" + hashFormat.chunk + ".bundle.map",
            chunkFilename: "[id]" + hashFormat.chunk + ".chunk.js"
        },
        module: {
            rules: [
                { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [nodeModules] },
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.html$/, loader: 'raw-loader' },
                { test: /\.(eot|svg)$/, loader: "file-loader?name=[name]" + hashFormat.file + ".[ext]" },
                {
                    test: /\.(jpg|png|gif|otf|ttf|woff|woff2)$/,
                    loader: "url-loader?name=[name]" + hashFormat.file + ".[ext]&limit=10000"
                }
            ].concat(extraRules)
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(appRoot, appConfig.index),
                filename: path.resolve(buildOptions.outputPath, appConfig.index),
                chunksSortMode: package_chunk_sort_1.packageChunkSort(appConfig),
                excludeChunks: lazyChunks,
                xhtml: true
            }),
            new base_href_webpack_1.BaseHrefWebpackPlugin({
                baseHref: buildOptions.baseHref
            }),
            new webpack.optimize.CommonsChunkPlugin({
                minChunks: Infinity,
                name: 'inline'
            })
        ].concat(extraPlugins),
        node: {
            fs: 'empty',
            global: true,
            crypto: 'empty',
            tls: 'empty',
            net: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
}
exports.getCommonConfig = getCommonConfig;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-configs/common.js.map