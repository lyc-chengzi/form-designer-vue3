import { EnumServiceResultStatus } from 'form-designer-types/enum/request';
import { IServiceResult } from 'form-designer-types/interface/request';
import {
    IFormDataAdd,
    IFormDataQuery,
    IFormDataUpdate,
} from 'form-designer-types/interface/service/form';
import apiDomain from '../apiDomain';
import { request } from '../../index';

export interface IFormContentResult {
    rows: any[];
    total: number;
}

const service = {
    // 提交表单数据
    addFormData: async (data: IFormDataAdd): Promise<IServiceResult> => {
        const res = await request.$fetch({
            method: 'POST',
            url: `${apiDomain.formService}/api/v1.0/form-content`,
            data: data,
        });
        return res;
    },
    // 修改表单数据
    updateFormData: async (data: IFormDataUpdate): Promise<IServiceResult> => {
        const res = await request.$fetch({
            method: 'PUT',
            url: `${apiDomain.formService}/api/v1.0/form-content`,
            data: data,
        });
        return res;
    },
    // 查询表单数据
    queryFormData: async (query: IFormDataQuery) => {
        const result: IServiceResult<IFormContentResult> = {
            status: EnumServiceResultStatus.failed,
            data: {
                rows: [],
                total: 0,
            },
            message: '',
        };
        const res = await request.$fetch({
            method: 'GET',
            url: `${apiDomain.formService}/api/v1.0/form-contents?${request.$parseUrlParmas(
                query
            )}`,
            // data: query,
        });
        if (res.status === EnumServiceResultStatus.success) {
            result.status = EnumServiceResultStatus.success;
            result.data.rows = res.data.formContentList.map((c: any) => {
                return {
                    id: c.id,
                    ...c.contents,
                };
            });
            result.data.total = res.data.total;
        }
        return result;
    },
    // 查询表单数据
    deleteFormData: async (formContentId: string): Promise<IServiceResult> => {
        const res = await request.$fetch({
            method: 'DELETE',
            url: `${apiDomain.formService}/api/v1.0/form-contents/${formContentId}`,
        });
        return res;
    },
};

export default service;
