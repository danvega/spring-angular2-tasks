"use strict";
var webpackMerge = require('webpack-merge');
var config_1 = require('./config');
var webpack_configs_1 = require('./webpack-configs');
var path = require('path');
var NgCliWebpackConfig = (function () {
    function NgCliWebpackConfig(buildOptions) {
        this.validateBuildOptions(buildOptions);
        var configPath = config_1.CliConfig.configFilePath();
        var projectRoot = path.dirname(configPath);
        var appConfig = config_1.CliConfig.fromProject().config.apps[0];
        appConfig = this.addAppConfigDefaults(appConfig);
        buildOptions = this.addTargetDefaults(buildOptions);
        buildOptions = this.mergeConfigs(buildOptions, appConfig);
        var wco = { projectRoot: projectRoot, buildOptions: buildOptions, appConfig: appConfig };
        var webpackConfigs = [
            webpack_configs_1.getCommonConfig(wco),
            webpack_configs_1.getStylesConfig(wco),
            this.getTargetConfig(wco)
        ];
        if (appConfig.main || appConfig.polyfills) {
            var typescriptConfigPartial = buildOptions.aot
                ? webpack_configs_1.getAotConfig(wco)
                : webpack_configs_1.getNonAotConfig(wco);
            webpackConfigs.push(typescriptConfigPartial);
        }
        // add style config
        this.config = webpackMerge(webpackConfigs);
    }
    NgCliWebpackConfig.prototype.getTargetConfig = function (webpackConfigOptions) {
        switch (webpackConfigOptions.buildOptions.target) {
            case 'development':
                return webpack_configs_1.getDevConfig(webpackConfigOptions);
            case 'production':
                return webpack_configs_1.getProdConfig(webpackConfigOptions);
        }
    };
    // Validate build options
    NgCliWebpackConfig.prototype.validateBuildOptions = function (buildOptions) {
        if (buildOptions.target !== 'development' && buildOptions.target !== 'production') {
            throw new Error("Invalid build target. Only 'development' and 'production' are available.");
        }
    };
    // Fill in defaults for build targets
    NgCliWebpackConfig.prototype.addTargetDefaults = function (buildOptions) {
        var targetDefaults = {
            development: {
                environment: 'dev',
                outputHashing: 'none',
                sourcemap: true,
                extractCss: false
            },
            production: {
                environment: 'prod',
                outputHashing: 'all',
                sourcemap: false,
                extractCss: true,
                aot: true
            }
        };
        return Object.assign({}, targetDefaults[buildOptions.target], buildOptions);
    };
    // Fill in defaults from angular-cli.json
    NgCliWebpackConfig.prototype.mergeConfigs = function (buildOptions, appConfig) {
        var mergeableOptions = {
            outputPath: appConfig.outDir,
            deployUrl: appConfig.deployUrl
        };
        return Object.assign({}, mergeableOptions, buildOptions);
    };
    NgCliWebpackConfig.prototype.addAppConfigDefaults = function (appConfig) {
        var appConfigDefaults = {
            scripts: [],
            styles: []
        };
        // can't use Object.assign here because appConfig has a lot of getters/setters
        for (var _i = 0, _a = Object.keys(appConfigDefaults); _i < _a.length; _i++) {
            var key = _a[_i];
            appConfig[key] = appConfig[key] || appConfigDefaults[key];
        }
        return appConfig;
    };
    return NgCliWebpackConfig;
}());
exports.NgCliWebpackConfig = NgCliWebpackConfig;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-config.js.map