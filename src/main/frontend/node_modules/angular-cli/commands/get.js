"use strict";
var config_1 = require('../models/config');
var SilentError = require('silent-error');
var Command = require('../ember-cli/lib/models/command');
var GetCommand = Command.extend({
    name: 'get',
    description: 'Get a value from the configuration.',
    works: 'everywhere',
    availableOptions: [
        { name: 'global', type: Boolean, 'default': false }
    ],
    run: function (commandOptions, rawArgs) {
        return new Promise(function (resolve) {
            var config = commandOptions.global ? config_1.CliConfig.fromGlobal() : config_1.CliConfig.fromProject();
            if (config === null) {
                throw new SilentError('No config found. If you want to use global configuration, '
                    + 'you need the --global argument.');
            }
            var value = config.get(rawArgs[0]);
            if (value === null || value === undefined) {
                throw new SilentError('Value cannot be found.');
            }
            else if (typeof value == 'object') {
                console.log(JSON.stringify(value));
            }
            else {
                console.log(value);
            }
            resolve();
        });
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetCommand;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/get.js.map