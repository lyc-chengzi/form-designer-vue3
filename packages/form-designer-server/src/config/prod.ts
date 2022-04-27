import { IConfig } from '../interface/config';

const prodConfig: IConfig = {
    port: 8080,
    mongodb: {
        db: '',
        host: '',
        port: 3000,
    },
};
export default prodConfig;
