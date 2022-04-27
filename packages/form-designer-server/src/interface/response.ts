export interface IResponseBody<DATA = any> {
    code: number;
    success: boolean;
    data: DATA;
    message: string;
}
