import { createStore } from 'vuex';

import designerModule, { commit_designer_init_appPages } from './modules/designer.module';
import LeftMenuModule from './modules/leftMenu.module';
import { IAppModuleState, IPageModuleState } from 'form-designer-types/interface/designer';
import { EnumAppMode } from 'form-designer-types/enum';

export const commit_app_changeMode = 'commit_app_changeMode';
type payload_app_changeMode = {
    mode: EnumAppMode;
};

// 初始化app信息
export const commit_app_setAppInfo = 'commit_app_setAppInfo';
type payload_app_initAppInfo = {
    projectId?: string;
    appId?: string;
    appName?: string;
    appContent?: string;
};

const _createStore = () => {
    return createStore<IAppModuleState>({
        state: {
            itcode: 'liuyc14',
            access: false,
            mode: EnumAppMode.design,
            appInfo: {
                projectId: '',
                appId: '',
                appName: '',
                appDescription: '',
            },
        },
        getters: {
            mode: state => state.mode,
        },
        mutations: {
            setAccess: (state, payload) => {
                state.access = payload.access;
            },
            [commit_app_setAppInfo]: (state, payload: payload_app_initAppInfo) => {
                if (payload.appId) {
                    state.appInfo.appId = payload.appId;
                }
                if (payload.appName) {
                    state.appInfo.appName = payload.appName;
                }
                if (payload.projectId) {
                    state.appInfo.projectId = payload.projectId;
                }
                if (payload.appContent) {
                    const pages = JSON.parse(payload.appContent) as IPageModuleState[];
                    // 如果之前有保存的页面
                    if (pages && pages instanceof Array && pages.length) {
                        console.log(state);
                        // this.$store.commit(`designer/${commit_designer_init_appPages}`, {
                        //     pages,
                        // });
                    }
                }
            },
            [commit_app_changeMode]: (state, payload: payload_app_changeMode) => {
                state.mode = payload.mode;
            },
        },
        actions: {
            fetchAccess(context) {
                new Promise(ok => {
                    setTimeout(() => {
                        ok('success');
                    }, 1000);
                }).then(() => {
                    context.commit('setAccess', { access: true });
                });
            },
        },
        modules: {
            leftMenu: LeftMenuModule,
            designer: designerModule,
        },
    });
};

const createDesignerStore = () => {
    return createStore<IAppModuleState>({
        state: {
            itcode: 'liuyc14',
            access: false,
            mode: EnumAppMode.design,
            appInfo: {
                projectId: '',
                appId: '',
                appName: '',
                appDescription: '',
            },
        },
        getters: {
            mode: state => state.mode,
            appInfo: state => state.appInfo,
        },
        mutations: {
            setAccess: (state, payload) => {
                state.access = payload.access;
            },
            [commit_app_changeMode]: (state, payload: payload_app_changeMode) => {
                state.mode = payload.mode;
            },
            [commit_app_setAppInfo](state, payload: payload_app_initAppInfo) {
                if (payload.appId) {
                    state.appInfo.appId = payload.appId;
                }
                if (payload.appName) {
                    state.appInfo.appName = payload.appName;
                }
                if (payload.projectId) {
                    state.appInfo.projectId = payload.projectId;
                }
                if (payload.appContent) {
                    const pages = JSON.parse(payload.appContent) as IPageModuleState[];
                    // 如果之前有保存的页面
                    if (pages && pages instanceof Array && pages.length) {
                        // @ts-ignore
                        this.commit(`designer/${commit_designer_init_appPages}`, { pages });
                    }
                }
            },
        },
        actions: {
            fetchAccess(context) {
                new Promise(ok => {
                    setTimeout(() => {
                        ok('success');
                    }, 1000);
                }).then(() => {
                    context.commit('setAccess', { access: true });
                });
            },
        },
        modules: {
            leftMenu: LeftMenuModule,
            designer: designerModule,
        },
    });
};

export default createStore;

export { _createStore, createDesignerStore };
