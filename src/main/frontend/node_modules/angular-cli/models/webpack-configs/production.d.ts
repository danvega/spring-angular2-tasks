/// <reference types="webpack" />
import * as webpack from 'webpack';
import { WebpackConfigOptions } from '../webpack-config';
export declare const getProdConfig: (wco: WebpackConfigOptions) => {
    plugins: webpack.Plugin[];
};
