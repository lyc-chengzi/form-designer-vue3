import * as KoaRouter from 'koa-router';
import UploadController from '../controller/uploadController';

export default function registerUploadRouter(router: KoaRouter): KoaRouter {
    const uploadController = new UploadController();
    router
        .post('/upload/csv/v1', uploadController.UploadCsvV1)
        .post('/upload/importConfig/v1', uploadController.importConfig);
    return router;
}
