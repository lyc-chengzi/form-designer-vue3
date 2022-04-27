import * as Koa from 'koa';
import { IController } from '../interface/controller';
import { IResponseBody } from '../interface/response';
import { accessLogger, applicationLogger } from '../middleware/log4js';

export default class Controller implements IController {
    public controllerName = 'Controller';

    readonly accessLogger = accessLogger();

    readonly appLogger = applicationLogger();

    responseJSONResult<DATA = any>(
        ctx: Koa.ParameterizedContext,
        body: IResponseBody<DATA>
    ) {
        ctx.set('content-type', 'application/json');
        ctx.set('controller', this.controllerName);
        ctx.body = JSON.stringify(body);
    }

    responseTextResult(ctx: Koa.ParameterizedContext, body: string) {
        ctx.set('content-type', 'application/json');
        ctx.set('controller', this.controllerName);
        ctx.body = body.toString();
    }
}
