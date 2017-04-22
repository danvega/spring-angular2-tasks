"use strict";
var Command = require('../ember-cli/lib/models/command');
// defaults for BuildOptions
exports.BaseBuildCommandOptions = [
    {
        name: 'target',
        type: String,
        default: 'development',
        aliases: ['t', { 'dev': 'development' }, { 'prod': 'production' }]
    },
    { name: 'environment', type: String, aliases: ['e'] },
    { name: 'output-path', type: 'Path', aliases: ['op'] },
    { name: 'aot', type: Boolean, default: false },
    { name: 'sourcemap', type: Boolean, aliases: ['sm'] },
    { name: 'vendor-chunk', type: Boolean, default: true, aliases: ['vc'] },
    { name: 'base-href', type: String, default: '/', aliases: ['bh'] },
    { name: 'deploy-url', type: String, aliases: ['d'] },
    { name: 'verbose', type: Boolean, default: false, aliases: ['v'] },
    { name: 'progress', type: Boolean, default: true, aliases: ['pr'] },
    { name: 'i18n-file', type: String },
    { name: 'i18n-format', type: String },
    { name: 'locale', type: String },
    { name: 'extract-css', type: Boolean, aliases: ['ec'] },
    {
        name: 'output-hashing',
        type: String,
        values: ['none', 'all', 'media', 'bundles'],
        description: 'define the output filename cache-busting hashing mode',
        aliases: ['oh']
    },
];
var BuildCommand = Command.extend({
    name: 'build',
    description: 'Builds your app and places it into the output path (dist/ by default).',
    aliases: ['b'],
    availableOptions: exports.BaseBuildCommandOptions.concat([
        { name: 'watch', type: Boolean, default: false, aliases: ['w'] }
    ]),
    run: function (commandOptions) {
        return require('./build.run').default.call(this, commandOptions);
    }
});
BuildCommand.overrideCore = true;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BuildCommand;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/build.js.map