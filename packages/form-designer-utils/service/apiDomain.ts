/**
 * Created by liuyc14 on 2017/10/16.
 */
import { EnumAppEnv } from 'form-designer-types/enum';

const __domain = {
    [EnumAppEnv.local]: '',
    [EnumAppEnv.dev]: 'https://tdp-dev.lenovo.com',
    [EnumAppEnv.tst]: 'https://tdp-tst.lenovo.com',
    [EnumAppEnv.production]: 'https://tdp-tst.lenovo.com',
};

// 读取环境变量 VUE_APP_ENV
const getEnv = (): EnumAppEnv => {
    let env = EnumAppEnv.local;
    if (process.env.VUE_APP_ENV === EnumAppEnv.production) {
        env = EnumAppEnv.production;
    } else if (process.env.REACT_APP_ENV === EnumAppEnv.dev) {
        env = EnumAppEnv.dev;
    } else if (process.env.REACT_APP_ENV === EnumAppEnv.tst) {
        env = EnumAppEnv.tst;
    }
    return env;
};

const env = getEnv();

const API_Domain = {
    env: env,
    domain: __domain[env],
    getEnv: getEnv,
    apiRepService: __domain[env] + '/api-repo',
    uiDesigner: __domain[env] + '/uidesigner',
    formService: __domain[env] + '/form',
};

export default API_Domain;
