"use strict";
var rimraf = require('rimraf');
var path = require('path');
var Task = require('../ember-cli/lib/models/task');
var webpack = require('webpack');
var webpack_config_1 = require('../models/webpack-config');
var utils_1 = require('../models/webpack-configs/utils');
var config_1 = require('../models/config');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task.extend({
    run: function (runTaskOptions) {
        var _this = this;
        var project = this.cliProject;
        var outputPath = runTaskOptions.outputPath || config_1.CliConfig.fromProject().config.apps[0].outDir;
        rimraf.sync(path.resolve(project.root, outputPath));
        var webpackConfig = new webpack_config_1.NgCliWebpackConfig(runTaskOptions).config;
        var webpackCompiler = webpack(webpackConfig);
        var statsConfig = utils_1.getWebpackStatsConfig(runTaskOptions.verbose);
        return new Promise(function (resolve, reject) {
            var callback = function (err, stats) {
                if (err) {
                    return reject(err);
                }
                _this.ui.writeLine(stats.toString(statsConfig));
                if (runTaskOptions.watch) {
                    return;
                }
                if (stats.hasErrors()) {
                    reject();
                }
                else {
                    resolve();
                }
            };
            if (runTaskOptions.watch) {
                webpackCompiler.watch({}, callback);
            }
            else {
                webpackCompiler.run(callback);
            }
        })
            .catch(function (err) {
            if (err) {
                _this.ui.writeError('\nAn error occured during the build:\n' + ((err && err.stack) || err));
            }
            throw err;
        });
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/tasks/build.js.map