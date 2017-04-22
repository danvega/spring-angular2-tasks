"use strict";
var utils_1 = require('../models/webpack-configs/utils');
// Sort chunks according to a predefined order:
// inline, polyfills, all scripts, all styles, vendor, main
function packageChunkSort(appConfig) {
    var entryPoints = ['inline', 'polyfills'];
    var pushExtraEntries = function (extraEntry) {
        if (entryPoints.indexOf(extraEntry.entry) === -1) {
            entryPoints.push(extraEntry.entry);
        }
    };
    if (appConfig.scripts) {
        utils_1.extraEntryParser(appConfig.scripts, './', 'scripts').forEach(pushExtraEntries);
    }
    if (appConfig.styles) {
        utils_1.extraEntryParser(appConfig.styles, './', 'styles').forEach(pushExtraEntries);
    }
    entryPoints.push.apply(entryPoints, ['vendor', 'main']);
    return function sort(left, right) {
        var leftIndex = entryPoints.indexOf(left.names[0]);
        var rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    };
}
exports.packageChunkSort = packageChunkSort;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/utilities/package-chunk-sort.js.map