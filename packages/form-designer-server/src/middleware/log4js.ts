import path = require('path');
import * as log4 from 'koa-log4';
import { Context } from 'koa';
import dayjs = require('dayjs');

import * as uuid from 'uuid';

log4.configure({
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID',
    appenders: {
        access: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: path.join(process.cwd(), 'logs', 'access.log'),
        },
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: path.join(process.cwd(), 'logs', 'application.log'),
        },
        out: {
            type: 'console',
        },
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'info',
        },
        access: {
            appenders: ['access'],
            level: 'info',
        },
        application: {
            appenders: ['application'],
            level: 'info',
        },
    },
});

const applicationLogger = () => {
    return log4.getLogger('application');
};

const accessLogger = () => {
    return log4.getLogger('access');
};

const getAccessLogger = () => {
    const logger = log4.getLogger('access');
    return async function log(ctx: Context, next: Function) {
        const startTime = dayjs();
        ctx.reqUUID = uuid.v1();
        console.debug('access logger pid:', process.pid);
        logger.info(
            `
                [${dayjs().format('YYYY-MM-DD HH:mm:ss')}]
                <!--${process.pid}--> 
                ${ctx.request.method} 
                ${ctx.request.url}
                uuid: ${ctx.reqUUID}
            `
        );
        logger.info(`${ctx.reqUUID} request body: `, ctx.request.body);
        try {
            await next();
            logger.info(`${ctx.reqUUID} response:`, ctx.response);
        } catch (error) {
            logger.warn('access logger await next error:', error);
            applicationLogger().error(error);
        }
        const endTime = dayjs();
        logger.info(
            `${ctx.reqUUID} 请求结束: ${ctx.response.status}，耗时: ${
                endTime.valueOf() - startTime.valueOf()
            }ms
            `
        );
    };
};

export default applicationLogger;
export { getAccessLogger, applicationLogger, accessLogger };
