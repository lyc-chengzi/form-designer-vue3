import API_Domain from '../apiDomain';
import { $fetch } from '../../request';

import { IAppDetail, IAppUpdate } from 'form-designer-types/interface/service/apps';

const service = {
    async getAppById(appId: string, projectId: string) {
        const res = await $fetch<IAppDetail>({
            url: `${API_Domain.uiDesigner}/api/v1.0/applications/${appId}`,
            method: 'GET',
            headers: {
                projectID: projectId,
            },
        });
        return res;
    },
    async updateApp(appId: string, projectId: string, app: IAppUpdate) {
        const res = await $fetch<IAppDetail>({
            url: `${API_Domain.uiDesigner}/api/v1.0/applications/${appId}`,
            data: app,
            method: 'PUT',
            headers: {
                projectID: projectId,
            },
        });
        return res;
    },
};

export default service;
