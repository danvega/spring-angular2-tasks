"use strict";
var Task = require('../ember-cli/lib/models/task');
var path = require('path');
var require_project_module_1 = require('../utilities/require-project-module');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task.extend({
    run: function (options) {
        var _this = this;
        var projectRoot = this.project.root;
        return new Promise(function (resolve) {
            var karma = require_project_module_1.requireDependency(projectRoot, 'karma');
            var karmaConfig = path.join(projectRoot, _this.project.ngConfig.config.test.karma.config);
            var karmaOptions = Object.assign({}, options);
            // Convert browsers from a string to an array
            if (options.browsers) {
                karmaOptions.browsers = options.browsers.split(',');
            }
            karmaOptions.angularCli = {
                codeCoverage: options.codeCoverage,
                sourcemap: options.sourcemap,
                progress: options.progress
            };
            // Assign additional karmaConfig options to the local ngapp config
            karmaOptions.configFile = karmaConfig;
            // :shipit:
            var karmaServer = new karma.Server(karmaOptions, resolve);
            karmaServer.start();
        });
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/tasks/test.js.map