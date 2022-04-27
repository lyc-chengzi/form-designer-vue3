/**
 * 通过规则，判断api接口返回的成功状态
 */
export enum EnumServiceResultStatus {
    success = 0,
    failed = 1,
    error = 2,
}

export enum EnumRequestHeadersKey {
    contentType = 'Content-type',
}

export enum EnumContentTypeValue {
    json = 'application/json;charset=UTF-8',
    formData = 'application/x-www-form-urlencoded;charset=utf-8',
    file = 'multipart/form-data;charset=utf-8',
}
