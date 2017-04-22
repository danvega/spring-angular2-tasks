"use strict";
var path = require('path');
exports.ngAppResolve = function (resolvePath) {
    return path.resolve(process.cwd(), resolvePath);
};
var webpackOutputOptions = {
    colors: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false,
    children: false,
    modules: false,
    reasons: false,
    warnings: true,
    assets: false,
    version: false
};
var verboseWebpackOutputOptions = {
    children: true,
    assets: true,
    version: true,
    reasons: true,
    chunkModules: false // TODO: set to true when console to file output is fixed
};
function getWebpackStatsConfig(verbose) {
    if (verbose === void 0) { verbose = false; }
    return verbose
        ? Object.assign(webpackOutputOptions, verboseWebpackOutputOptions)
        : webpackOutputOptions;
}
exports.getWebpackStatsConfig = getWebpackStatsConfig;
// Filter extra entries out of a arran of extraEntries
function lazyChunksFilter(extraEntries) {
    return extraEntries
        .filter(function (extraEntry) { return extraEntry.lazy; })
        .map(function (extraEntry) { return extraEntry.entry; });
}
exports.lazyChunksFilter = lazyChunksFilter;
// convert all extra entries into the object representation, fill in defaults
function extraEntryParser(extraEntries, appRoot, defaultEntry) {
    return extraEntries
        .map(function (extraEntry) {
        return typeof extraEntry === 'string' ? { input: extraEntry } : extraEntry;
    })
        .map(function (extraEntry) {
        extraEntry.path = path.resolve(appRoot, extraEntry.input);
        if (extraEntry.output) {
            extraEntry.entry = extraEntry.output.replace(/\.(js|css)$/i, '');
        }
        else if (extraEntry.lazy) {
            extraEntry.entry = extraEntry.input.replace(/\.(js|css|scss|sass|less|styl)$/i, '');
        }
        else {
            extraEntry.entry = defaultEntry;
        }
        return extraEntry;
    });
}
exports.extraEntryParser = extraEntryParser;
function getOutputHashFormat(option, length) {
    if (length === void 0) { length = 20; }
    /* tslint:disable:max-line-length */
    var hashFormats = {
        none: { chunk: '', extract: '', file: '' },
        media: { chunk: '', extract: '', file: ".[hash:" + length + "]" },
        bundles: { chunk: ".[chunkhash:" + length + "]", extract: ".[contenthash:" + length + "]", file: '' },
        all: { chunk: ".[chunkhash:" + length + "]", extract: ".[contenthash:" + length + "]", file: ".[hash:" + length + "]" },
    };
    /* tslint:enable:max-line-length */
    return hashFormats[option] || hashFormats['none'];
}
exports.getOutputHashFormat = getOutputHashFormat;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-configs/utils.js.map