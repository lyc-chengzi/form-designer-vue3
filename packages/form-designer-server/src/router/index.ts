import * as KoaRouter from 'koa-router';
import registerHomeRouter from './homeRouter';
import registerUploadRouter from './uploadRouter';

const router = new KoaRouter();
registerHomeRouter(router);
registerUploadRouter(router);
export default router;
