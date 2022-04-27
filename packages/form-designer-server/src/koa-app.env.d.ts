import * as Koa from "koa";

declare namespace NodeJS {
    interface ProcessEnv {
        readonly KOA_APP_PORT: string;
        readonly KOA_APP_ENV: string;
    }
}

declare module "koa" {
    interface Context {
        reqUUID?: any;
    }
}
