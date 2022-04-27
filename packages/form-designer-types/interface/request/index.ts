import { AxiosRequestConfig } from 'axios';
import { EnumServiceResultStatus } from '../../enum/request';
//接口返回的原始数据结构
export interface IServerResponse<DATA> {
    code: string | number;
    data: DATA;
    message: string;
    timestamp: number;
    success: boolean;
}
export interface IFetchAsyncResult<DATA = any> extends IBaseAsyncResult<IServerResponse<DATA>> {}
// 请求返回结果结构体
export interface IBaseAsyncResult<BODY = any> {
    success: boolean;
    httpStatus: number /*http状态码*/;
    message: string;
    body: BODY;
    headers: any;
    error?: Error & { response: any };
}
// axios请求参数
export interface IFetchOptions extends AxiosRequestConfig {
    postType?: 'form-data' | 'json';
}

// service的返回结构
export interface IServiceResult<DATA = any> {
    status: EnumServiceResultStatus;
    message: string;
    data: DATA;
    code?: number | string;
}
