// const devConfig = require("./dev");
// const prodConfig  = require("./prod");
import { IConfig } from '../interface/config';
import localConfig from './localhost';
import devConfig from './dev';
import prodConfig from './prod';
import { EnumAppEnv } from '../enums';

const config: IConfig = (function getConfig() {
    const appEnv = process.env.KOA_APP_ENV as EnumAppEnv;
    if (appEnv === EnumAppEnv.localhost) {
        return localConfig;
    }
    if (appEnv === EnumAppEnv.development) {
        return devConfig;
    }
    if (appEnv === EnumAppEnv.production) {
        return prodConfig;
    }
    return localConfig;
})();

export default config;
