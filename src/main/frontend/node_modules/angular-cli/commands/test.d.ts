export interface TestOptions {
    watch?: boolean;
    codeCoverage?: boolean;
    singleRun?: boolean;
    browsers?: string;
    colors?: boolean;
    log?: string;
    port?: number;
    reporters?: string;
    build?: boolean;
    sourcemap?: boolean;
    progress?: boolean;
}
declare const TestCommand: any;
export default TestCommand;
