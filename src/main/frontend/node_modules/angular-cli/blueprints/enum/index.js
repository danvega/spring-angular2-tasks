"use strict";
var stringUtils = require('ember-cli-string-utils');
var dynamicPathParser = require('../../utilities/dynamic-path-parser');
var Blueprint = require('../../ember-cli/lib/models/blueprint');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Blueprint.extend({
    description: '',
    normalizeEntityName: function (entityName) {
        var parsedPath = dynamicPathParser(this.project, entityName);
        this.dynamicPath = parsedPath;
        return parsedPath.name;
    },
    locals: function (options) {
        this.fileName = stringUtils.dasherize(options.entity.name);
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat,
            fileName: this.fileName
        };
    },
    fileMapTokens: function () {
        var _this = this;
        // Return custom template variables here.
        return {
            __path__: function () {
                _this.generatePath = _this.dynamicPath.dir;
                return _this.generatePath;
            },
            __name__: function () {
                return _this.fileName;
            }
        };
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/blueprints/enum/index.js.map