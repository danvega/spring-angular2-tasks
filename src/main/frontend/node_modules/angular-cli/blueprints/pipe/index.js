"use strict";
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var dynamicPathParser = require('../../utilities/dynamic-path-parser');
var stringUtils = require('ember-cli-string-utils');
var astUtils = require('../../utilities/ast-utils');
var findParentModule = require('../../utilities/find-parent-module').default;
var NodeHost = require('@angular-cli/ast-tools').NodeHost;
var Blueprint = require('../../ember-cli/lib/models/blueprint');
var getFiles = Blueprint.prototype.files;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Blueprint.extend({
    description: '',
    availableOptions: [
        { name: 'flat', type: Boolean, default: true },
        { name: 'spec', type: Boolean },
        { name: 'skip-import', type: Boolean, default: false },
        { name: 'module', type: String, aliases: ['m'] },
        { name: 'export', type: Boolean, default: false }
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
        else {
            try {
                this.pathToModule = findParentModule(this.project, this.dynamicPath.dir);
            }
            catch (e) {
                if (!options.skipImport) {
                    throw "Error locating module for declaration\n\t" + e;
                }
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
            this.project.ngConfigObj.get('defaults.spec.pipe');
        return {
            dynamicPath: this.dynamicPath.dir,
            flat: options.flat
        };
    },
    files: function () {
        var fileList = getFiles.call(this);
        if (this.options && !this.options.spec) {
            fileList = fileList.filter(function (p) { return p.indexOf('__name__.pipe.spec.ts') < 0; });
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
        var _this = this;
        if (options.dryRun) {
            return;
        }
        var returns = [];
        var className = stringUtils.classify(options.entity.name + "Pipe");
        var fileName = stringUtils.dasherize(options.entity.name + ".pipe");
        var fullGeneratePath = path.join(this.project.root, this.generatePath);
        var moduleDir = path.parse(this.pathToModule).dir;
        var relativeDir = path.relative(moduleDir, fullGeneratePath);
        var importPath = relativeDir ? "./" + relativeDir + "/" + fileName : "./" + fileName;
        if (!options.skipImport) {
            returns.push(astUtils.addDeclarationToModule(this.pathToModule, className, importPath)
                .then(function (change) { return change.apply(NodeHost); })
                .then(function (result) {
                if (options.export) {
                    return astUtils.addExportToModule(_this.pathToModule, className, importPath)
                        .then(function (change) { return change.apply(NodeHost); });
                }
                return result;
            }));
            this._writeStatusToUI(chalk.yellow, 'update', path.relative(this.project.root, this.pathToModule));
        }
        return Promise.all(returns);
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/blueprints/pipe/index.js.map