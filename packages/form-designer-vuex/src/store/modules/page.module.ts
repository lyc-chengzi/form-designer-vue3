import { ILayoutState } from 'form-designer-components/src/components/layout/interface';
import { IPageModuleState } from 'form-designer-types/interface/designer';
import { Module } from 'vuex';

type commit_page_addLayout_payload = {
    layout: ILayoutState;
};

// 页面添加布局组件
export const commit_page_addLayout = 'commit_page_addLayout';

const PageModule = <Module<IPageModuleState, any>>{
    namespaced: true,
    state: {} as IPageModuleState,
    mutations: {
        [commit_page_addLayout]: (state, payload: commit_page_addLayout_payload) => {
            if (state.list) {
                state.list.push(payload.layout as any);
            }
        },
    },
};

export default PageModule;
