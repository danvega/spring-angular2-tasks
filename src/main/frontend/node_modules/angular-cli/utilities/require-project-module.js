"use strict";
var path = require('path');
// require dependencies within the target project
function requireDependency(root, moduleName) {
    var packageJson = require(path.join(root, 'node_modules', moduleName, 'package.json'));
    var main = path.normalize(packageJson.main);
    return require(path.join(root, 'node_modules', moduleName, main));
}
exports.requireDependency = requireDependency;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/utilities/require-project-module.js.map