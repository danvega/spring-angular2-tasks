"use strict";
var Task = require('../ember-cli/lib/models/task');
var chalk = require('chalk');
var require_project_module_1 = require('../utilities/require-project-module');
var config_1 = require('../models/config');
var common_tags_1 = require('common-tags');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task.extend({
    run: function (commandOptions) {
        var ui = this.ui;
        var projectRoot = this.project.root;
        return new Promise(function (resolve, reject) {
            var tslint = require_project_module_1.requireDependency(projectRoot, 'tslint');
            var Linter = tslint.Linter;
            var Configuration = tslint.Configuration;
            var lintConfigs = config_1.CliConfig.fromProject().config.lint || [];
            if (lintConfigs.length === 0) {
                ui.writeLine(chalk.yellow((_a = ["\n          No lint config(s) found.\n          If this is not intended, run \"ng update\".\n        "], _a.raw = ["\n          No lint config(s) found.\n          If this is not intended, run \"ng update\".\n        "], common_tags_1.oneLine(_a))));
                return resolve(0);
            }
            var errors = 0;
            lintConfigs.forEach(function (config) {
                var program = Linter.createProgram(config.project);
                var files = Linter.getFileNames(program);
                var linter = new Linter({
                    fix: commandOptions.fix,
                    formatter: commandOptions.format
                }, program);
                files.forEach(function (file) {
                    var fileContents = program.getSourceFile(file).getFullText();
                    var configLoad = Configuration.findConfiguration(config.tslintConfig, file);
                    linter.lint(file, fileContents, configLoad.results);
                });
                var result = linter.getResult();
                errors += result.failureCount;
                ui.writeLine(result.output.trim().concat('\n'));
            });
            if (errors > 0) {
                ui.writeLine(chalk.red('Lint errors found in the listed files.'));
                return commandOptions.force ? resolve(0) : resolve(2);
            }
            ui.writeLine(chalk.green('All files pass linting.'));
            return resolve(0);
            var _a;
        });
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/tasks/lint.js.map