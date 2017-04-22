export interface BuildOptions {
    target?: string;
    environment?: string;
    outputPath?: string;
    aot?: boolean;
    sourcemap?: boolean;
    vendorChunk?: boolean;
    baseHref?: string;
    deployUrl?: string;
    verbose?: boolean;
    progress?: boolean;
    i18nFile?: string;
    i18nFormat?: string;
    locale?: string;
    extractCss?: boolean;
    outputHashing?: string;
}
export interface WebpackConfigOptions {
    projectRoot: string;
    buildOptions: BuildOptions;
    appConfig: any;
}
export declare class NgCliWebpackConfig {
    config: any;
    constructor(buildOptions: BuildOptions);
    getTargetConfig(webpackConfigOptions: WebpackConfigOptions): any;
    private validateBuildOptions(buildOptions);
    private addTargetDefaults(buildOptions);
    private mergeConfigs(buildOptions, appConfig);
    private addAppConfigDefaults(appConfig);
}
