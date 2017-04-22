import { BuildOptions } from '../models/webpack-config';
export interface ServeTaskOptions extends BuildOptions {
    port?: number;
    host?: string;
    proxyConfig?: string;
    liveReload?: boolean;
    liveReloadHost?: string;
    liveReloadPort?: number;
    liveReloadBaseUrl?: string;
    liveReloadLiveCss?: boolean;
    ssl?: boolean;
    sslKey?: string;
    sslCert?: string;
    open?: boolean;
    hmr?: boolean;
}
declare const ServeCommand: any;
export default ServeCommand;
