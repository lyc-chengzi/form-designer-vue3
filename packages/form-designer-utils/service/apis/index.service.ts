import API_Domain from '../apiDomain';
import { $fetch } from '../../request';
import {
    IDataModlerApiDetail,
    IDataModlerApiResponse,
} from 'form-designer-types/interface/request/api';

const service = {
    // 获取data modeler api列表
    getApiList: async () => {
        const res = await $fetch<IDataModlerApiResponse>({
            url: `${API_Domain.apiRepService}/api/v1.0/interfaces/query?page=1&size=400`,
            method: 'POST',
        });
        return res;
    },
    // 根据id获取api详情
    getApiDetail: async (id: number) => {
        const res = await $fetch<IDataModlerApiDetail>({
            url: `${API_Domain.apiRepService}/api/v1.0/interfaces/${id}`,
            method: 'GET',
        });
        return res;
    },
};

export default service;
