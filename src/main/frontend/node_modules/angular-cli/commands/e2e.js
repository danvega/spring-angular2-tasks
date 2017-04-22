"use strict";
var Command = require('../ember-cli/lib/models/command');
var config_1 = require('../models/config');
var E2eCommand = Command.extend({
    name: 'e2e',
    description: 'Run e2e tests in existing project',
    works: 'insideProject',
    run: function () {
        var E2eTask = require('../tasks/e2e').E2eTask;
        this.project.ngConfig = this.project.ngConfig || config_1.CliConfig.fromProject();
        var e2eTask = new E2eTask({
            ui: this.ui,
            project: this.project
        });
        return e2eTask.run();
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = E2eCommand;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/e2e.js.map