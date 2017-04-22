"use strict";
var Command = require('../ember-cli/lib/models/command');
var InitCommand = Command.extend({
    name: 'init',
    description: 'Creates a new angular-cli project in the current folder.',
    aliases: ['u', 'update', 'i'],
    works: 'everywhere',
    availableOptions: [
        { name: 'dry-run', type: Boolean, default: false, aliases: ['d'] },
        { name: 'verbose', type: Boolean, default: false, aliases: ['v'] },
        { name: 'link-cli', type: Boolean, default: false, aliases: ['lc'] },
        { name: 'skip-npm', type: Boolean, default: false, aliases: ['sn'] },
        { name: 'skip-git', type: Boolean, default: false, aliases: ['sg'] },
        { name: 'skip-tests', type: Boolean, default: false, aliases: ['st'] },
        { name: 'skip-commit', type: Boolean, default: false, aliases: ['sc'] },
        { name: 'name', type: String, default: '', aliases: ['n'] },
        { name: 'source-dir', type: String, default: 'src', aliases: ['sd'] },
        { name: 'style', type: String, default: 'css' },
        { name: 'prefix', type: String, default: 'app', aliases: ['p'] },
        { name: 'routing', type: Boolean, default: false },
        { name: 'inline-style', type: Boolean, default: false, aliases: ['is'] },
        { name: 'inline-template', type: Boolean, default: false, aliases: ['it'] }
    ],
    anonymousOptions: ['<glob-pattern>'],
    run: function (commandOptions, rawArgs) {
        return require('./init.run').default.call(this, commandOptions, rawArgs);
    }
});
InitCommand.overrideCore = true;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InitCommand;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/init.js.map