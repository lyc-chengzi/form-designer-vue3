import * as Koa from 'koa';
import { ILoginRequest } from '../interface/homeController';
import Controller from './controller';
// import { appRouter, appLog, appController } from "../decorators";

// @appController()
class HomeController extends Controller {
    constructor() {
        super();
        this.controllerName = 'HomeController';
        this.list = this.list.bind(this);
    }

    index = async (ctx: Koa.Context, next: Function) => {
        next();
        this.responseTextResult(ctx, '首页测试成功啦');
    };

    login = async (ctx: Koa.Context, next: Function) => {
        await next();
        await this.delay2();
        const body = ctx.request.body as ILoginRequest;
        if (!body.itcode) {
            return this.responseJSONResult(ctx, {
                code: 200,
                success: false,
                data: null,
                message: 'itcode不能为空',
            });
        }
        if (!body.password) {
            return this.responseJSONResult(ctx, {
                code: 200,
                success: false,
                data: null,
                message: '密码不能为空',
            });
        }
        return this.responseJSONResult(ctx, {
            code: 200,
            success: true,
            data: null,
            message: '登录成功',
        });
    };

    // @appRouter({ method: "get", path: "/home/list" })
    // @appLog
    async list(ctx: Koa.Context, next: Function) {
        await next();
        this.responseJSONResult(ctx, {
            code: 200,
            success: true,
            data: { name: 'qinchao2', age: 30, itcode: 2 },
            message: '',
        });
    }

    delay2 = async () => {
        return new Promise<void>((ok) => {
            setTimeout(() => {
                ok();
            }, 5000);
        });
    };
}

export default HomeController;
