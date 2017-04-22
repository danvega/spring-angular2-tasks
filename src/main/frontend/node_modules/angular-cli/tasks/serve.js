"use strict";
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var rimraf = require('rimraf');
var SilentError = require('silent-error');
var Task = require('../ember-cli/lib/models/task');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var utils_1 = require('../models/webpack-configs/utils');
var webpack_config_1 = require('../models/webpack-config');
var config_1 = require('../models/config');
var common_tags_1 = require('common-tags');
var url = require('url');
var common_tags_2 = require('common-tags');
var opn = require('opn');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task.extend({
    run: function (serveTaskOptions) {
        var ui = this.ui;
        var webpackCompiler;
        var projectConfig = config_1.CliConfig.fromProject().config;
        var appConfig = projectConfig.apps[0];
        var outputPath = serveTaskOptions.outputPath || appConfig.outDir;
        rimraf.sync(path.resolve(this.project.root, outputPath));
        var serveDefaults = {
            // default deployUrl to '' on serve to prevent the default from angular-cli.json
            deployUrl: ''
        };
        serveTaskOptions = Object.assign({}, serveDefaults, serveTaskOptions);
        var webpackConfig = new webpack_config_1.NgCliWebpackConfig(serveTaskOptions).config;
        // This allows for live reload of page when changes are made to repo.
        // https://webpack.github.io/docs/webpack-dev-server.html#inline-mode
        var entryPoints = [
            ("webpack-dev-server/client?http://" + serveTaskOptions.host + ":" + serveTaskOptions.port + "/")
        ];
        if (serveTaskOptions.hmr) {
            var webpackHmrLink = 'https://webpack.github.io/docs/hot-module-replacement.html';
            ui.writeLine((_a = ["\n        ", " Hot Module Replacement (HMR) is enabled for the dev server.\n      "], _a.raw = ["\n        ", " Hot Module Replacement (HMR) is enabled for the dev server.\n      "], common_tags_1.oneLine(_a, chalk.yellow('NOTICE'))));
            ui.writeLine('  The project will still live reload when HMR is enabled,');
            ui.writeLine('  but to take advantage of HMR additional application code is required');
            ui.writeLine('  (not included in an angular-cli project by default).');
            ui.writeLine("  See " + chalk.blue(webpackHmrLink));
            ui.writeLine('  for information on working with HMR for Webpack.');
            entryPoints.push('webpack/hot/dev-server');
            webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
            webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
            if (serveTaskOptions.extractCss) {
                ui.writeLine((_b = ["\n          ", " (HMR) does not allow for CSS hot reload when used\n          together with '--extract-css'.\n        "], _b.raw = ["\n          ", " (HMR) does not allow for CSS hot reload when used\n          together with '--extract-css'.\n        "], common_tags_1.oneLine(_b, chalk.yellow('NOTICE'))));
            }
        }
        if (!webpackConfig.entry.main) {
            webpackConfig.entry.main = [];
        }
        (_c = webpackConfig.entry.main).unshift.apply(_c, entryPoints);
        webpackCompiler = webpack(webpackConfig);
        var statsConfig = utils_1.getWebpackStatsConfig(serveTaskOptions.verbose);
        var proxyConfig = {};
        if (serveTaskOptions.proxyConfig) {
            var proxyPath = path.resolve(this.project.root, serveTaskOptions.proxyConfig);
            if (fs.existsSync(proxyPath)) {
                proxyConfig = require(proxyPath);
            }
            else {
                var message = 'Proxy config file ' + proxyPath + ' does not exist.';
                return Promise.reject(new SilentError(message));
            }
        }
        var sslKey = null;
        var sslCert = null;
        if (serveTaskOptions.ssl) {
            var keyPath = path.resolve(this.project.root, serveTaskOptions.sslKey);
            if (fs.existsSync(keyPath)) {
                sslKey = fs.readFileSync(keyPath, 'utf-8');
            }
            var certPath = path.resolve(this.project.root, serveTaskOptions.sslCert);
            if (fs.existsSync(certPath)) {
                sslCert = fs.readFileSync(certPath, 'utf-8');
            }
        }
        var webpackDevServerConfiguration = {
            contentBase: path.join(this.project.root, "./" + appConfig.root),
            headers: { 'Access-Control-Allow-Origin': '*' },
            historyApiFallback: {
                index: "/" + appConfig.index,
                disableDotRule: true,
                htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
            },
            stats: statsConfig,
            inline: true,
            proxy: proxyConfig,
            compress: serveTaskOptions.target === 'production',
            watchOptions: {
                poll: projectConfig.defaults && projectConfig.defaults.poll
            },
            https: serveTaskOptions.ssl
        };
        if (sslKey != null && sslCert != null) {
            webpackDevServerConfiguration.key = sslKey;
            webpackDevServerConfiguration.cert = sslCert;
        }
        webpackDevServerConfiguration.hot = serveTaskOptions.hmr;
        if (serveTaskOptions.target === 'production') {
            ui.writeLine(chalk.red((_d = ["\n        ****************************************************************************************\n        This is a simple server for use in testing or debugging Angular applications locally.\n        It hasn't been reviewed for security issues.\n\n        DON'T USE IT FOR PRODUCTION USE!\n        ****************************************************************************************\n      "], _d.raw = ["\n        ****************************************************************************************\n        This is a simple server for use in testing or debugging Angular applications locally.\n        It hasn't been reviewed for security issues.\n\n        DON'T USE IT FOR PRODUCTION USE!\n        ****************************************************************************************\n      "], common_tags_2.stripIndents(_d))));
        }
        ui.writeLine(chalk.green((_e = ["\n      **\n      NG Live Development Server is running on\n      http", "://", ":", ".\n      **\n    "], _e.raw = ["\n      **\n      NG Live Development Server is running on\n      http", "://", ":", ".\n      **\n    "], common_tags_1.oneLine(_e, serveTaskOptions.ssl ? 's' : '', serveTaskOptions.host, serveTaskOptions.port))));
        var server = new WebpackDevServer(webpackCompiler, webpackDevServerConfiguration);
        return new Promise(function (resolve, reject) {
            server.listen(serveTaskOptions.port, "" + serveTaskOptions.host, function (err, stats) {
                if (err) {
                    console.error(err.stack || err);
                    if (err.details) {
                        console.error(err.details);
                    }
                    reject(err.details);
                }
                else {
                    var open = serveTaskOptions.open, ssl = serveTaskOptions.ssl, host = serveTaskOptions.host, port = serveTaskOptions.port;
                    if (open) {
                        var protocol = ssl ? 'https' : 'http';
                        opn(url.format({ protocol: protocol, hostname: host, port: port.toString() }));
                    }
                }
            });
        });
        var _a, _b, _c, _d, _e;
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/tasks/serve.js.map