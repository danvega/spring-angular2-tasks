"use strict";
var path = require('path');
var webpack_1 = require('@ngtools/webpack');
var g = global;
var webpackLoader = g['angularCliIsLocal']
    ? g.angularCliPackages['@ngtools/webpack'].main
    : '@ngtools/webpack';
exports.getNonAotConfig = function (wco) {
    var projectRoot = wco.projectRoot, appConfig = wco.appConfig;
    var exclude = ['**/*.spec.ts'];
    if (appConfig.test) {
        exclude.push(path.join(projectRoot, appConfig.root, appConfig.test));
    }
    ;
    return {
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: webpackLoader,
                    exclude: [/\.(spec|e2e)\.ts$/]
                }
            ]
        },
        plugins: [
            new webpack_1.AotPlugin({
                tsConfigPath: path.resolve(projectRoot, appConfig.root, appConfig.tsconfig),
                mainPath: path.join(projectRoot, appConfig.root, appConfig.main),
                exclude: exclude,
                skipCodeGeneration: true
            }),
        ]
    };
};
exports.getAotConfig = function (wco) {
    var projectRoot = wco.projectRoot, buildOptions = wco.buildOptions, appConfig = wco.appConfig;
    var exclude = ['**/*.spec.ts'];
    if (appConfig.test) {
        exclude.push(path.join(projectRoot, appConfig.root, appConfig.test));
    }
    ;
    return {
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: webpackLoader,
                    exclude: [/\.(spec|e2e)\.ts$/]
                }
            ]
        },
        plugins: [
            new webpack_1.AotPlugin({
                tsConfigPath: path.resolve(projectRoot, appConfig.root, appConfig.tsconfig),
                mainPath: path.join(projectRoot, appConfig.root, appConfig.main),
                i18nFile: buildOptions.i18nFile,
                i18nFormat: buildOptions.i18nFormat,
                locale: buildOptions.locale,
                exclude: exclude
            })
        ]
    };
};
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-configs/typescript.js.map