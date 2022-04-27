import * as KoaRouter from 'koa-router';
import HomeController from '../controller/homeController';

export default function registerHomeRouter(router: KoaRouter): KoaRouter {
    const homeController = new HomeController();
    router
        .get('/', homeController.index)
        .get('/home', homeController.index)
        .get('/home/index', homeController.index)
        .post('/home/list', homeController.list)
        .post('/home/login', homeController.login);
    return router;
}
