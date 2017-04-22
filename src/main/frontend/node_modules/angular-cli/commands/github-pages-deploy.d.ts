export interface GithubPagesDeployOptions {
    message?: string;
    target?: string;
    environment?: string;
    userPage?: boolean;
    skipBuild?: boolean;
    ghToken?: string;
    ghUsername?: string;
    baseHref?: string;
    customDomain?: string;
    aot?: boolean;
    vendorChunk?: boolean;
}
declare const GithubPagesDeployCommand: any;
export default GithubPagesDeployCommand;
