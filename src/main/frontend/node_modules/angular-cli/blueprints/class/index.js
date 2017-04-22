"use strict";
var stringUtils = require('ember-cli-string-utils');
var dynamicPathParser = require('../../utilities/dynamic-path-parser');
var Blueprint = require('../../ember-cli/lib/models/blueprint');
var getFiles = Blueprint.prototype.files;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Blueprint.extend({
    description: '',
    availableOptions: [
        { name: 'spec', type: Boolean }
    ],
    normalizeEntityName: function (entityName) {
        var parsedPath = dynamicPathParser(this.project, entityName.split('.')[0]);
        this.dynamicPath = parsedPath;
        return parsedPath.name;
    },
    locals: function (options) {
        var rawName = options.args[1];
        var nameParts = rawName.split('.')
            .filter(function (part) { return part.length !== 0; });
        var classType = nameParts[1];
        this.fileName = stringUtils.dasherize(options.entity.name);
        if (classType) {
            this.fileName += '.' + classType.toLowerCase();
        }
        options.spec = options.spec !== undefined ?
            options.spec :
            this.project.ngConfigObj.get('defaults.spec.class');
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat,
            fileName: this.fileName
        };
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (this.options && !this.options.spec) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__.spec.ts') < 0; });
        }
        return fileList;
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
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/blueprints/class/index.js.map