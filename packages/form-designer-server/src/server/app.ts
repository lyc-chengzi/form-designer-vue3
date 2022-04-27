import os = require('os');
import * as path from 'path';
import * as Koa from 'koa';
// import KoaLogger = require("koa-logger");
import koaBody = require('koa-body');
import dayjs = require('dayjs');

import { getAccessLogger, applicationLogger } from '../middleware/log4js';
import config from '../config';
import router from '../router';

const app = new Koa();
const appLogger = applicationLogger();

app.use(
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join(process.cwd(), 'public/uploads'),
            keepExtensions: true,
        },
    })
);
app.use(getAccessLogger());
app.use(router.routes());

app.on('error', (err) => {
    appLogger.error(err);
});

app.listen(config.port);

appLogger.info(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] 服务启动: `);
appLogger.info(`主机名: ${os.hostname}, 端口号: ${config.port}`);

console.log(`服务已开启，端口号: ${config.port}`);
