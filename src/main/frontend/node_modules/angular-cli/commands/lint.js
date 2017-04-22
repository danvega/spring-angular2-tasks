"use strict";
var Command = require('../ember-cli/lib/models/command');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Command.extend({
    name: 'lint',
    aliases: ['l'],
    description: 'Lints code in existing project',
    works: 'insideProject',
    availableOptions: [
        { name: 'fix', type: Boolean, default: false },
        { name: 'force', type: Boolean, default: false },
        { name: 'format', alias: 't', type: String, default: 'prose' }
    ],
    run: function (commandOptions) {
        var LintTask = require('../tasks/lint').default;
        var lintTask = new LintTask({
            ui: this.ui,
            project: this.project
        });
        return lintTask.run(commandOptions);
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/lint.js.map