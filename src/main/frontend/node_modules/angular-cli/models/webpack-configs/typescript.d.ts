import { AotPlugin } from '@ngtools/webpack';
import { WebpackConfigOptions } from '../webpack-config';
export declare const getNonAotConfig: (wco: WebpackConfigOptions) => {
    module: {
        rules: {
            test: RegExp;
            loader: string;
            exclude: RegExp[];
        }[];
    };
    plugins: AotPlugin[];
};
export declare const getAotConfig: (wco: WebpackConfigOptions) => {
    module: {
        rules: {
            test: RegExp;
            loader: string;
            exclude: RegExp[];
        }[];
    };
    plugins: AotPlugin[];
};
