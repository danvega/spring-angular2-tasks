"use strict";
var webpack = require('webpack');
var path = require('path');
var suppress_entry_chunks_webpack_plugin_1 = require('../../plugins/suppress-entry-chunks-webpack-plugin');
var utils_1 = require('./utils');
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * Enumerate loaders and their dependencies from this file to let the dependency validator
 * know they are used.
 *
 * require('raw-loader')
 * require('style-loader')
 * require('postcss-loader')
 * require('css-loader')
 * require('stylus')
 * require('stylus-loader')
 * require('less')
 * require('less-loader')
 * require('node-sass')
 * require('sass-loader')
 */
function getStylesConfig(wco) {
    var projectRoot = wco.projectRoot, buildOptions = wco.buildOptions, appConfig = wco.appConfig;
    var appRoot = path.resolve(projectRoot, appConfig.root);
    var entryPoints = {};
    var globalStylePaths = [];
    var extraPlugins = [];
    // style-loader does not support sourcemaps without absolute publicPath, so it's
    // better to disable them when not extracting css
    // https://github.com/webpack-contrib/style-loader#recommended-configuration
    var cssSourceMap = buildOptions.extractCss && buildOptions.sourcemap;
    // minify/optimize css in production
    // autoprefixer is always run separately so disable here
    var extraPostCssPlugins = buildOptions.target === 'production'
        ? [cssnano({ safe: true, autoprefixer: false })]
        : [];
    // determine hashing format
    var hashFormat = utils_1.getOutputHashFormat(buildOptions.outputHashing);
    // use includePaths from appConfig
    var includePaths = [];
    if (appConfig.stylePreprocessorOptions
        && appConfig.stylePreprocessorOptions.includePaths
        && appConfig.stylePreprocessorOptions.includePaths.length > 0) {
        appConfig.stylePreprocessorOptions.includePaths.forEach(function (includePath) {
            return includePaths.push(path.resolve(appRoot, includePath));
        });
    }
    // process global styles
    if (appConfig.styles.length > 0) {
        var globalStyles = utils_1.extraEntryParser(appConfig.styles, appRoot, 'styles');
        // add style entry points
        globalStyles.forEach(function (style) {
            return entryPoints[style.entry]
                ? entryPoints[style.entry].push(style.path)
                : entryPoints[style.entry] = [style.path];
        });
        // add global css paths
        globalStylePaths.push.apply(globalStylePaths, globalStyles.map(function (style) { return style.path; }));
    }
    // set base rules to derive final rules from
    var baseRules = [
        { test: /\.css$/, loaders: [] },
        { test: /\.scss$|\.sass$/, loaders: ['sass-loader'] },
        { test: /\.less$/, loaders: ['less-loader'] },
        // stylus-loader doesn't support webpack.LoaderOptionsPlugin properly,
        // so we need to add options in its query
        {
            test: /\.styl$/, loaders: [("stylus-loader?" + JSON.stringify({
                    sourceMap: cssSourceMap,
                    paths: includePaths
                }))]
        }
    ];
    var commonLoaders = ['postcss-loader'];
    // load component css as raw strings
    var rules = baseRules.map(function (_a) {
        var test = _a.test, loaders = _a.loaders;
        return ({
            exclude: globalStylePaths, test: test, loaders: ['raw-loader'].concat(commonLoaders, loaders)
        });
    });
    // load global css as css files
    if (globalStylePaths.length > 0) {
        rules.push.apply(rules, baseRules.map(function (_a) {
            var test = _a.test, loaders = _a.loaders;
            return ({
                include: globalStylePaths, test: test, loaders: ExtractTextPlugin.extract({
                    loader: [
                        // css-loader doesn't support webpack.LoaderOptionsPlugin properly,
                        // so we need to add options in its query
                        ("css-loader?" + JSON.stringify({ sourceMap: cssSourceMap }))
                    ].concat(commonLoaders, loaders),
                    fallbackLoader: 'style-loader',
                    // publicPath needed as a workaround https://github.com/angular/angular-cli/issues/4035
                    publicPath: ''
                })
            });
        }));
    }
    // supress empty .js files in css only entry points
    if (buildOptions.extractCss) {
        extraPlugins.push(new suppress_entry_chunks_webpack_plugin_1.SuppressExtractedTextChunksWebpackPlugin());
    }
    return {
        entry: entryPoints,
        module: { rules: rules },
        plugins: [
            // extract global css from js files into own css file
            new ExtractTextPlugin({
                filename: "[name]" + hashFormat.extract + ".bundle.css",
                disable: !buildOptions.extractCss
            }),
            new webpack.LoaderOptionsPlugin({
                sourceMap: cssSourceMap,
                options: {
                    postcss: [autoprefixer()].concat(extraPostCssPlugins),
                    // css-loader, stylus-loader don't support LoaderOptionsPlugin properly
                    // options are in query instead
                    sassLoader: { sourceMap: cssSourceMap, includePaths: includePaths },
                    // less-loader doesn't support paths
                    lessLoader: { sourceMap: cssSourceMap },
                    // context needed as a workaround https://github.com/jtangelder/sass-loader/issues/285
                    context: projectRoot,
                },
            })
        ].concat(extraPlugins)
    };
}
exports.getStylesConfig = getStylesConfig;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-configs/styles.js.map