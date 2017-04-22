// Remove .js files from entry points consisting entirely of .css|scss|sass|less|styl.
// To be used together with ExtractTextPlugin.
"use strict";
var SuppressExtractedTextChunksWebpackPlugin = (function () {
    function SuppressExtractedTextChunksWebpackPlugin() {
    }
    SuppressExtractedTextChunksWebpackPlugin.prototype.apply = function (compiler) {
        compiler.plugin('compilation', function (compilation) {
            // find which chunks have css only entry points
            var cssOnlyChunks = [];
            var entryPoints = compilation.options.entry;
            // determine which entry points are composed entirely of css files
            for (var _i = 0, _a = Object.keys(entryPoints); _i < _a.length; _i++) {
                var entryPoint = _a[_i];
                if (entryPoints[entryPoint].every(function (el) {
                    return el.match(/\.(css|scss|sass|less|styl)$/);
                })) {
                    cssOnlyChunks.push(entryPoint);
                }
            }
            // Remove the js file for supressed chunks
            compilation.plugin('after-seal', function (callback) {
                compilation.chunks
                    .filter(function (chunk) { return cssOnlyChunks.indexOf(chunk.name) !== -1; })
                    .forEach(function (chunk) {
                    var newFiles = [];
                    chunk.files.forEach(function (file) {
                        if (file.match(/\.js$/)) {
                            // remove js files
                            delete compilation.assets[file];
                        }
                        else {
                            newFiles.push(file);
                        }
                    });
                    chunk.files = newFiles;
                });
                callback();
            });
            // Remove scripts tags with a css file as source, because HtmlWebpackPlugin will use
            // a css file as a script for chunks without js files.
            compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
                var filterFn = function (tag) {
                    return !(tag.tagName === 'script' && tag.attributes.src.match(/\.css$/));
                };
                htmlPluginData.head = htmlPluginData.head.filter(filterFn);
                htmlPluginData.body = htmlPluginData.body.filter(filterFn);
                callback(null, htmlPluginData);
            });
        });
    };
    return SuppressExtractedTextChunksWebpackPlugin;
}());
exports.SuppressExtractedTextChunksWebpackPlugin = SuppressExtractedTextChunksWebpackPlugin;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/plugins/suppress-entry-chunks-webpack-plugin.js.map