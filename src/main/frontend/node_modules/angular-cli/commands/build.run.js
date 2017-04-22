"use strict";
var version_1 = require('../upgrade/version');
var build_1 = require('../tasks/build');
function buildRun(commandOptions) {
    var project = this.project;
    // Check angular version.
    version_1.Version.assertAngularVersionIs2_3_1OrHigher(project.root);
    var buildTask = new build_1.default({
        cliProject: project,
        ui: this.ui,
    });
    return buildTask.run(commandOptions);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildRun;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/build.run.js.map