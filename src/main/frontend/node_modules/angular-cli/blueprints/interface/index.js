"use strict";
var stringUtils = require('ember-cli-string-utils');
var dynamicPathParser = require('../../utilities/dynamic-path-parser');
var Blueprint = require('../../ember-cli/lib/models/blueprint');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Blueprint.extend({
    description: '',
    anonymousOptions: [
        '<interface-type>'
    ],
    normalizeEntityName: function (entityName) {
        var parsedPath = dynamicPathParser(this.project, entityName);
        this.dynamicPath = parsedPath;
        return parsedPath.name;
    },
    locals: function (options) {
        var interfaceType = options.args[2];
        this.fileName = stringUtils.dasherize(options.entity.name);
        if (interfaceType) {
            this.fileName += '.' + interfaceType;
        }
        var prefix = '';
        if (this.project.ngConfig &&
            this.project.ngConfig.defaults &&
            this.project.ngConfig.defaults.prefixInterfaces) {
            prefix = 'I';
        }
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat,
            fileName: this.fileName,
            prefix: prefix
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
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/blueprints/interface/index.js.map