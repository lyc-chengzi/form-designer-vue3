import { EnumApiType } from 'form-designer-types/enum/components';
import { IComponentState } from 'form-designer-types/interface/components';
import { IComponentApi } from 'form-designer-types/interface/components';

const ApiFactory = {
    // 根据apiName获取api对象
    getApiValueByName(state: IComponentState, apiName: string) {
        if (state && state.apis && state.apis.length) {
            return state.apis.find(api => api.name === apiName);
        }
        return undefined;
    },
    // 根据apiType获取api对象
    getApiValueByType(state: IComponentState, apiType: EnumApiType) {
        if (state && state.apis && state.apis.length) {
            return state.apis.filter(api => api.type === apiType);
        }
        return [];
    },
    // 添加api
    pushApiValue: (state: IComponentState, value: IComponentApi) => {
        if (state) {
            if (state.apis) {
                const apiIndex = state.apis.findIndex(api => api.name === value.name);
                // 如果name相同，直接替换
                if (apiIndex > -1) {
                    state.apis[apiIndex] = value;
                }
                // 如果没有相同的，则push到api数组中
                else {
                    state.apis.push(value);
                }
            } else {
                state.apis = [value];
            }
        }
    },
    // 删除某个api
    removeApiValue(state: IComponentState, name: string): void {
        if (state && state.apis) {
            const apiIndex = state.apis.findIndex(api => api.name === name);
            if (apiIndex > -1) {
                state.apis.splice(apiIndex, 1);
            }
        }
    },
};

export default ApiFactory;
