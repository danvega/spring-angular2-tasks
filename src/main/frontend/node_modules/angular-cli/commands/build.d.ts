import { BuildOptions } from '../models/webpack-config';
export declare const BaseBuildCommandOptions: any;
export interface BuildTaskOptions extends BuildOptions {
    watch?: boolean;
}
declare const BuildCommand: any;
export default BuildCommand;
