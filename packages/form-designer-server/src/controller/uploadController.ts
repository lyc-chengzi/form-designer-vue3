import * as Koa from 'koa';
import * as fs from 'fs';
import Controller from './controller';
import { convertCvsToTable } from '../utils';

class UploadController extends Controller {
    constructor() {
        super();
        this.controllerName = 'UploadController';
    }

    private readCsvFile = async (path: string) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject('读取csv文件内容错误');
                } else {
                    const datas = convertCvsToTable(data);
                    resolve(datas);
                }
            });
        });
    };

    private readConfigFile = async (path: string) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject('读取config文件内容错误');
                } else {
                    try {
                        const json = JSON.parse(data.toString());
                        resolve(json);
                    } catch (error) {
                        reject(error.toString());
                    }
                }
            });
        });
    };

    // upload/csv/v1 fileName: file
    UploadCsvV1 = async (ctx: Koa.Context, next: Function) => {
        const files = ctx.request.files;
        if (files && files.file) {
            const file = files.file;
            // @ts-ignore
            const fileData = await this.readCsvFile(file.path);
            this.responseJSONResult(ctx, {
                code: 1,
                data: fileData,
                message: '成功',
                success: true,
            });
        } else {
            this.responseJSONResult(ctx, {
                code: 1,
                data: null,
                message: '请选择要上传的文件',
                success: false,
            });
        }
        await next();
    };

    importConfig = async (ctx: Koa.Context, next: Function) => {
        const files = ctx.request.files;
        if (files && files.file) {
            const file = files.file;
            // @ts-ignore
            const fileData = await this.readConfigFile(file.path);
            this.responseJSONResult(ctx, {
                code: 1,
                data: fileData,
                message: '成功',
                success: true,
            });
        } else {
            this.responseJSONResult(ctx, {
                code: 1,
                data: null,
                message: '请选择要上传的文件',
                success: false,
            });
        }
        await next();
    };
}

export default UploadController;
