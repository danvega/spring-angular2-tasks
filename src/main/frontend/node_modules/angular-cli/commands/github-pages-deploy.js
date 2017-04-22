"use strict";
var Command = require('../ember-cli/lib/models/command');
var common_tags_1 = require('common-tags');
var GithubPagesDeployCommand = Command.extend({
    name: 'github-pages:deploy',
    aliases: ['gh-pages:deploy'],
    description: (_a = ["\n    Build the test app for production, commit it into a git branch,\n    setup GitHub repo and push to it\n  "], _a.raw = ["\n    Build the test app for production, commit it into a git branch,\n    setup GitHub repo and push to it\n  "], common_tags_1.oneLine(_a)),
    works: 'insideProject',
    availableOptions: [
        {
            name: 'message',
            type: String,
            default: 'new gh-pages version',
            description: 'The commit message to include with the build, must be wrapped in quotes.'
        }, {
            name: 'target',
            type: String,
            default: 'production',
            aliases: ['t', { 'dev': 'development' }, { 'prod': 'production' }]
        }, {
            name: 'environment',
            type: String,
            default: '',
            aliases: ['e']
        }, {
            name: 'user-page',
            type: Boolean,
            default: false,
            description: 'Deploy as a user/org page'
        }, {
            name: 'skip-build',
            type: Boolean,
            default: false,
            description: 'Skip building the project before deploying'
        }, {
            name: 'gh-token',
            type: String,
            default: '',
            description: 'GitHub token'
        }, {
            name: 'gh-username',
            type: String,
            default: '',
            description: 'GitHub username'
        }, {
            name: 'base-href',
            type: String,
            default: null,
            aliases: ['bh']
        }, {
            name: 'custom-domain',
            type: String,
            default: null,
            aliases: ['cd'],
            description: 'Custom domain for Github Pages'
        }, {
            name: 'aot',
            type: Boolean,
            default: false,
        }, {
            name: 'vendor-chunk',
            type: Boolean,
            default: false,
        }],
    run: function (options, rawArgs) {
        return require('./github-pages-deploy.run').default.call(this, options, rawArgs);
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GithubPagesDeployCommand;
var _a;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/github-pages-deploy.js.map