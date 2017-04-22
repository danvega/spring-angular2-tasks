"use strict";
var chalk = require('chalk');
var link_cli_1 = require('../tasks/link-cli');
var npm_install_1 = require('../tasks/npm-install');
var Promise = require('../ember-cli/lib/ext/promise');
var SilentError = require('silent-error');
var validProjectName = require('../ember-cli/lib/utilities/valid-project-name');
var normalizeBlueprint = require('../ember-cli/lib/utilities/normalize-blueprint-option');
var GitInit = require('../tasks/git-init');
function initRun(commandOptions, rawArgs) {
    var _this = this;
    if (commandOptions.dryRun) {
        commandOptions.skipNpm = true;
    }
    var installBlueprint = new this.tasks.InstallBlueprint({
        ui: this.ui,
        project: this.project
    });
    // needs an explicit check in case it's just 'undefined'
    // due to passing of options from 'new' and 'addon'
    var gitInit;
    if (commandOptions.skipGit === false) {
        gitInit = new GitInit({
            ui: this.ui,
            project: this.project
        });
    }
    var npmInstall;
    if (!commandOptions.skipNpm) {
        npmInstall = new npm_install_1.default({
            ui: this.ui,
            project: this.project
        });
    }
    var linkCli;
    if (commandOptions.linkCli) {
        linkCli = new link_cli_1.default({
            ui: this.ui,
            project: this.project
        });
    }
    var project = this.project;
    var packageName = commandOptions.name !== '.' && commandOptions.name || project.name();
    if (!packageName) {
        var message = 'The `ng ' + this.name + '` command requires a ' +
            'package.json in current folder with name attribute or a specified name via arguments. ' +
            'For more details, use `ng help`.';
        return Promise.reject(new SilentError(message));
    }
    var blueprintOpts = {
        dryRun: commandOptions.dryRun,
        blueprint: 'ng2',
        rawName: packageName,
        targetFiles: rawArgs || '',
        rawArgs: rawArgs.toString(),
        sourceDir: commandOptions.sourceDir,
        style: commandOptions.style,
        prefix: commandOptions.prefix,
        routing: commandOptions.routing,
        inlineStyle: commandOptions.inlineStyle,
        inlineTemplate: commandOptions.inlineTemplate,
        ignoredUpdateFiles: ['favicon.ico'],
        skipGit: commandOptions.skipGit,
        skipTests: commandOptions.skipTests
    };
    if (!validProjectName(packageName)) {
        return Promise.reject(new SilentError('We currently do not support a name of `' + packageName + '`.'));
    }
    blueprintOpts.blueprint = normalizeBlueprint(blueprintOpts.blueprint);
    return installBlueprint.run(blueprintOpts)
        .then(function () {
        if (commandOptions.skipGit === false) {
            return gitInit.run(commandOptions, rawArgs);
        }
    })
        .then(function () {
        if (!commandOptions.skipNpm) {
            return npmInstall.run();
        }
    })
        .then(function () {
        if (commandOptions.linkCli) {
            return linkCli.run();
        }
    })
        .then(function () {
        _this.ui.writeLine(chalk.green("Project '" + packageName + "' successfully created."));
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initRun;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/init.run.js.map