"use strict";
var common_tags_1 = require('common-tags');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var dynamicPathParser = require('../../utilities/dynamic-path-parser');
var Blueprint = require('../../ember-cli/lib/models/blueprint');
var NodeHost = require('@angular-cli/ast-tools').NodeHost;
var stringUtils = require('ember-cli-string-utils');
var astUtils = require('../../utilities/ast-utils');
var getFiles = Blueprint.prototype.files;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Blueprint.extend({
    description: '',
    availableOptions: [
        { name: 'flat', type: Boolean, default: true },
        { name: 'spec', type: Boolean },
        { name: 'module', type: String, aliases: ['m'] }
    ],
    beforeInstall: function (options) {
        if (options.module) {
            // Resolve path to module
            var modulePath = options.module.endsWith('.ts') ? options.module : options.module + ".ts";
            var parsedPath = dynamicPathParser(this.project, modulePath);
            this.pathToModule = path.join(this.project.root, parsedPath.dir, parsedPath.base);
            if (!fs.existsSync(this.pathToModule)) {
                throw 'Module specified does not exist';
            }
        }
    },
    normalizeEntityName: function (entityName) {
        var parsedPath = dynamicPathParser(this.project, entityName);
        this.dynamicPath = parsedPath;
        return parsedPath.name;
    },
    locals: function (options) {
        options.spec = options.spec !== undefined ?
            options.spec :
            this.project.ngConfigObj.get('defaults.spec.service');
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat
        };
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (this.options && !this.options.spec) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__.service.spec.ts') < 0; });
        }
        return fileList;
    },
    fileMapTokens: function (options) {
        var _this = this;
        // Return custom template variables here.
        return {
            __path__: function () {
                var dir = _this.dynamicPath.dir;
                if (!options.locals.flat) {
                    dir += path.sep + options.dasherizedModuleName;
                }
                _this.generatePath = dir;
                return dir;
            }
        };
    },
    afterInstall: function (options) {
        var returns = [];
        if (!this.pathToModule) {
            var warningMessage = (_a = ["\n        Service is generated but not provided,\n        it must be provided to be used\n      "], _a.raw = ["\n        Service is generated but not provided,\n        it must be provided to be used\n      "], common_tags_1.oneLine(_a));
            this._writeStatusToUI(chalk.yellow, 'WARNING', warningMessage);
        }
        else {
            var className = stringUtils.classify(options.entity.name + "Service");
            var fileName = stringUtils.dasherize(options.entity.name + ".service");
            var fullGeneratePath = path.join(this.project.root, this.generatePath);
            var moduleDir = path.parse(this.pathToModule).dir;
            var relativeDir = path.relative(moduleDir, fullGeneratePath);
            var importPath = relativeDir ? "./" + relativeDir + "/" + fileName : "./" + fileName;
            returns.push(astUtils.addProviderToModule(this.pathToModule, className, importPath)
                .then(function (change) { return change.apply(NodeHost); }));
            this._writeStatusToUI(chalk.yellow, 'update', path.relative(this.project.root, this.pathToModule));
        }
        return Promise.all(returns);
        var _a;
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/blueprints/service/index.js.map