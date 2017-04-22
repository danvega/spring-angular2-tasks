"use strict";
var chalk = require('chalk');
var init_1 = require('./init');
var common_tags_1 = require('common-tags');
var Command = require('../ember-cli/lib/models/command');
var Project = require('../ember-cli/lib/models/project');
var SilentError = require('silent-error');
var validProjectName = require('../ember-cli/lib/utilities/valid-project-name');
var packageNameRegexp = /^[a-zA-Z][.0-9a-zA-Z]*(-[a-zA-Z][.0-9a-zA-Z]*)*$/;
function getRegExpFailPosition(str) {
    var parts = str.split('-');
    var matched = [];
    parts.forEach(function (part) {
        if (part.match(packageNameRegexp)) {
            matched.push(part);
        }
    });
    var compare = matched.join('-');
    return (str !== compare) ? compare.length : null;
}
var NewCommand = Command.extend({
    name: 'new',
    description: "Creates a new directory and runs " + chalk.green('ng init') + " in it.",
    works: 'outsideProject',
    availableOptions: [
        { name: 'dry-run', type: Boolean, default: false, aliases: ['d'] },
        { name: 'verbose', type: Boolean, default: false, aliases: ['v'] },
        { name: 'link-cli', type: Boolean, default: false, aliases: ['lc'] },
        { name: 'skip-npm', type: Boolean, default: false, aliases: ['sn'] },
        { name: 'skip-git', type: Boolean, default: false, aliases: ['sg'] },
        { name: 'skip-tests', type: Boolean, default: false, aliases: ['st'] },
        { name: 'skip-commit', type: Boolean, default: false, aliases: ['sc'] },
        { name: 'directory', type: String, aliases: ['dir'] },
        { name: 'source-dir', type: String, default: 'src', aliases: ['sd'] },
        { name: 'style', type: String, default: 'css' },
        { name: 'prefix', type: String, default: 'app', aliases: ['p'] },
        { name: 'routing', type: Boolean, default: false },
        { name: 'inline-style', type: Boolean, default: false, aliases: ['is'] },
        { name: 'inline-template', type: Boolean, default: false, aliases: ['it'] }
    ],
    run: function (commandOptions, rawArgs) {
        var packageName = rawArgs.shift();
        if (!packageName) {
            return Promise.reject(new SilentError(("The \"ng " + this.name + "\" command requires a name argument to be specified. ") +
                "For more details, use \"ng help\"."));
        }
        if (!packageName.match(packageNameRegexp)) {
            var firstMessage = (_a = ["\n        Project name \"", "\" is not valid. New project names must\n        start with a letter, and must contain only alphanumeric characters or dashes.\n        When adding a dash the segment after the dash must start with a letter too.\n      "], _a.raw = ["\n        Project name \"", "\" is not valid. New project names must\n        start with a letter, and must contain only alphanumeric characters or dashes.\n        When adding a dash the segment after the dash must start with a letter too.\n      "], common_tags_1.oneLine(_a, packageName));
            var msg = (_b = ["\n        ", "\n        ", "\n        ", "\n      "], _b.raw = ["\n        ", "\n        ", "\n        ", "\n      "], common_tags_1.stripIndent(_b, firstMessage, packageName, Array(getRegExpFailPosition(packageName) + 1).join(' ') + '^'));
            return Promise.reject(new SilentError(msg));
        }
        commandOptions.name = packageName;
        if (commandOptions.dryRun) {
            commandOptions.skipGit = true;
        }
        if (packageName === '.') {
            return Promise.reject(new SilentError("Trying to generate an application structure in this directory? Use \"ng init\" " +
                "instead."));
        }
        if (!validProjectName(packageName)) {
            return Promise.reject(new SilentError("We currently do not support a name of \"" + packageName + "\"."));
        }
        if (!commandOptions.directory) {
            commandOptions.directory = packageName;
        }
        var createAndStepIntoDirectory = new this.tasks.CreateAndStepIntoDirectory({ ui: this.ui });
        var initCommand = new init_1.default({
            ui: this.ui,
            tasks: this.tasks,
            project: Project.nullProject(this.ui, this.cli)
        });
        return createAndStepIntoDirectory
            .run({
            directoryName: commandOptions.directory,
            dryRun: commandOptions.dryRun
        })
            .then(initCommand.run.bind(initCommand, commandOptions, rawArgs));
        var _a, _b;
    }
});
NewCommand.overrideCore = true;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewCommand;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/new.js.map