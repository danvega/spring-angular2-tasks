"use strict";
var build_1 = require('./build');
var config_1 = require('../models/config');
var PortFinder = require('portfinder');
var Command = require('../ember-cli/lib/models/command');
var config = config_1.CliConfig.fromProject() || config_1.CliConfig.fromGlobal();
PortFinder.basePort = 49152;
var defaultPort = process.env.PORT || config.get('defaults.serve.port');
var defaultHost = config.get('defaults.serve.host');
var ServeCommand = Command.extend({
    name: 'serve',
    description: 'Builds and serves your app, rebuilding on file changes.',
    aliases: ['server', 's'],
    availableOptions: build_1.BaseBuildCommandOptions.concat([
        { name: 'port', type: Number, default: defaultPort, aliases: ['p'] },
        {
            name: 'host',
            type: String,
            default: defaultHost,
            aliases: ['H'],
            description: "Listens only on " + defaultHost + " by default"
        },
        { name: 'proxy-config', type: 'Path', aliases: ['pc'] },
        { name: 'live-reload', type: Boolean, default: true, aliases: ['lr'] },
        {
            name: 'live-reload-host',
            type: String,
            aliases: ['lrh'],
            description: 'Defaults to host'
        },
        {
            name: 'live-reload-base-url',
            type: String,
            aliases: ['lrbu'],
            description: 'Defaults to baseURL'
        },
        {
            name: 'live-reload-port',
            type: Number,
            aliases: ['lrp'],
            description: '(Defaults to port number within [49152...65535])'
        },
        {
            name: 'live-reload-live-css',
            type: Boolean,
            default: true,
            description: 'Whether to live reload CSS (default true)'
        },
        { name: 'ssl', type: Boolean, default: false },
        { name: 'ssl-key', type: String, default: 'ssl/server.key' },
        { name: 'ssl-cert', type: String, default: 'ssl/server.crt' },
        {
            name: 'open',
            type: Boolean,
            default: false,
            aliases: ['o'],
            description: 'Opens the url in default browser',
        },
        {
            name: 'hmr',
            type: Boolean,
            default: false,
            description: 'Enable hot module replacement',
        }
    ]),
    run: function (commandOptions) {
        return require('./serve.run').default.call(this, commandOptions);
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServeCommand;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/serve.js.map