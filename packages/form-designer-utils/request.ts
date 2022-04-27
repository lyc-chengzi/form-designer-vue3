import axios from 'axios';
import {
    IFetchAsyncResult,
    IFetchOptions,
    IServerResponse,
    IServiceResult,
} from 'form-designer-types/interface/request';

import {
    EnumContentTypeValue,
    EnumRequestHeadersKey,
    EnumServiceResultStatus,
} from 'form-designer-types/enum/request';

/**
 * fetch请求，并处理返回数据
 * @param options 请求参数
 * @returns 返回处理过的结构数据
 */
export const $fetch = async <DATA = any>(options: IFetchOptions) => {
    const result: IServiceResult<DATA> = {
        status: EnumServiceResultStatus.failed,
        data: {} as DATA,
        message: '',
    };
    const response = await _fetch<DATA>(options);
    $handleResponse(response, {
        success: body => {
            result.status = EnumServiceResultStatus.success;
            result.data = body.data;
        },
        fail: (code, msg) => {
            result.status = EnumServiceResultStatus.failed;
            result.message = msg;
            result.code = code;
        },
        error: () => {
            result.status = EnumServiceResultStatus.error;
        },
    });
    return result;
};

/**
 * fetch请求，返回原始数据
 * @param options 请求参数
 * @returns 返回接口返回的原始数据
 */
export const _fetch = async <DATA = any>(options: IFetchOptions) => {
    const result: IFetchAsyncResult<DATA> = {
        success: false,
        httpStatus: 500,
        message: '',
        body: { code: '500', data: {} as DATA, message: '', timestamp: 0, success: false },
        headers: undefined,
        error: undefined,
    };
    let response;
    try {
        const headers = $getBaseHeaders(options.headers);
        // formData的请求数据处理
        if (options.postType === 'form-data') {
            headers[EnumRequestHeadersKey.contentType] = EnumContentTypeValue.formData;
            options.transformRequest = [
                data => {
                    return $parseUrlParmas(data);
                },
            ];
        } else if (options.postType === 'json') {
            headers[EnumRequestHeadersKey.contentType] = EnumContentTypeValue.json;
        }
        options.headers = headers;
        response = await axios(options);
        result.httpStatus = response.status;
        result.body = response.data;
        result.success = response.status === 200;
    } catch (e) {
        result.success = false;
        result.httpStatus = (response && response.status) || 500;
    }
    return result;
};

/**
 * 格式化json对象为a=1&b=2的格式
 * @param urlParams json对象
 * @returns {string}
 */
export const $parseUrlParmas = (urlParams: any) => {
    if (!urlParams || typeof urlParams !== 'object') {
        return '';
    }
    const keys = Object.keys(urlParams);
    if (keys.length === 0) {
        return '';
    }

    let result = '';
    keys.forEach(key => {
        if (!urlParams[key] && typeof urlParams[key] !== 'number') {
            delete urlParams[key];
        } else {
            result += `&${key}=${encodeURIComponent(urlParams[key])}`;
        }
    });
    result = result.replace('&', '');
    return result;
};

export const $handleResponse = <T = any>(
    response: IFetchAsyncResult<T>,
    callback: {
        success: (body: IServerResponse<T>) => void;
        fail?: (code: string | number, msg: string) => void;
        error?: (e: any) => void;
    }
) => {
    const body = response.body || ({} as IServerResponse<T>);
    if (body.success) {
        callback.success(body);
    } else if (response.success && body && !body.success) {
        callback.fail && callback.fail(body.code, body.message || body.message || '');
    } else {
        if (callback.error) {
            callback.error(response.error);
        } else {
            callback.fail && callback.fail(body.code, body.message || body.message || '');
        }
    }
};
export const $getBaseHeaders = (headers = {}) => {
    const more: any = {
        tenantId: '25',
    };
    if (headers) {
        return Object.assign({}, headers, more);
    } else {
        return more;
    }
};
