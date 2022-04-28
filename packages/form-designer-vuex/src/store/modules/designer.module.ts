import { Module } from 'vuex';

import {
    EnumComponentType,
    EnumComponentGroup,
    EnumPropsValueType,
} from 'form-designer-types/enum/components';

import { IPageForm } from 'form-designer-types/interface/designer/pageForm';
import { IPageModuleState } from 'form-designer-types/interface/designer';
import { IDesignerComponent, IDesignerModuleState } from 'form-designer-types/interface/designer';

import { utils } from 'form-designer-utils';
import { apps, forms } from 'form-designer-utils/service';
import { EnumServiceResultStatus } from 'form-designer-types/enum/request';

// 生成一个默认的page配置
const getDefaultPageModule = (state: IDesignerModuleState): IPageModuleState => {
    const newPage: IPageModuleState = {
        key: utils.$getUUID(EnumComponentType.page),
        code: '',
        label: '表单' + (state.pages.length + 1),
        icon: 'flex',
        type: EnumComponentType.page,
        group: EnumComponentGroup.page,
        selected: false,
        submitState: 'unsaved',
        props: {
            pageData: {
                type: EnumPropsValueType.object,
                value: {
                    text: 'testExpression',
                },
            },
            pageMethods: {
                type: EnumPropsValueType.object,
                value: {
                    setText: `this.pageData.text = new Date().toLocaleTimeString();`,
                },
            },
        },
        list: [],
    };
    // const formState = state.componentList.find(c => c.type === EnumComponentType.form);
    // if (formState) {
    //     const formKey = utils.$getUUID(EnumComponentType.form);
    //     const newForm: IDesignerComponent = {
    //         key: formKey,
    //         code: '',
    //         label: formState.label,
    //         icon: formState.icon,
    //         group: formState.group,
    //         type: formState.type,
    //         list: [],
    //     };
    //     newPage.list!.push(newForm);
    // }
    const layoutState = state.componentList.find(c => c.type === EnumComponentType.layout);
    if (layoutState) {
        const Key = utils.$getUUID(EnumComponentType.layout);
        const newForm: IDesignerComponent = {
            key: Key,
            code: '',
            label: layoutState.label,
            icon: layoutState.icon,
            group: layoutState.group,
            type: layoutState.type,
            list: [],
        };
        newPage.list!.push(newForm);
    }
    return newPage;
};

export const commit_designer_import_config = 'commit_designer_import_config';
type payload_designer_import_config = {
    pages: IPageModuleState[];
};
// 设置当前编辑器的组件列表
export const commit_designer_set_componentList = 'commit_designer_set_componentList';
type payload_designer_set_componentList = {
    list: IDesignerComponent[];
};
// 添加页面
export const commit_designer_add_page = 'commit_designer_add_page';
type payload_designer_add_page = {
    page?: IPageModuleState;
};
// 删除页面
export const commit_designer_delete_page = 'commit_designer_delete_page';
// 初始化第一个页面
export const commit_designer_init_appPages = 'commit_designer_init_appPages';
type payload_designer_init_appPages = {
    pages: IPageModuleState[];
};
// 初始化一个设计器页面
export const commit_designer_init_designer_page = 'commit_designer_init_designer_page';

// 追加一批组件
export const commit_designer_add_components = 'commit_designer_add_components';

// 设置当前页面
export const commit_designer_setSelectPage = 'commit_designer_setSelectPage';
type payload_designer_setSelectPage = {
    pageId: string;
};

// 组件拖入设计面板后，增加渲染组件
export const commit_designer_dragAddComponent = 'commit_designer_dragAddComponent';
type payload_designer_dragAddComponent = {
    parent: IDesignerComponent;
    component: IDesignerComponent;
};

// 双击组件，增加渲染组件
export const commit_designer_doubleAddComponent = 'commit_designer_doubleAddComponent';
type payload_designer_doubleAddComponent = {
    parent: IDesignerComponent;
    component: IDesignerComponent;
};

// 设置拖动的组件
export const commit_designer_setDragComponent = 'commit_designer_setDragComponent';
type payload_designer_setDragComponent = {
    component: IDesignerComponent;
};

// 设置当前选中的组件
export const commit_designer_selectedComponent = 'commit_designer_selectedComponent';
type payload_designer_selectedComponent = {
    component: IDesignerComponent;
};

// 根据key删除某个组件
export const commit_designer_deleteComponent = 'commit_designer_deleteComponent';
type payload_designer_deleteComponent = {
    id: string;
};

// 导入csv数据
export const commit_designer_importCsvData = 'commit_designer_importCsvData';
type payload_designer_importCsvData = {
    pageName: string;
    pageCode: string;
    data: any;
};

// 给pageForm赋值
export const commit_designer_setPageForm = 'commit_designer_setPageForm';
type payload_designer_setPageForm = {
    pageForm: IPageForm;
};

// 导入csv文件数据
export const dispatch_designer_importCsvData = 'dispatch_designer_importCsvData';
// 设计页面保存操作
export const dispatch_designer_save = 'dispatch_designer_save';
// 保存页面json数据
export const dispatch_designer_savePage = 'dispatch_designer_savePage';
// 保存form数据结构
export const dispatch_designer_saveForm = 'dispatch_designer_saveForm';
// 导入json数据
export const dispatch_designer_importJson = 'dispatch_designer_importJson';
// 导出json数据
export const dispatch_designer_exportJson = 'dispatch_designer_exportJson';
// 提交表单
export const dispatch_designer_submitForm = 'dispatch_designer_submitForm';

const DesignerModule = <Module<IDesignerModuleState, any>>{
    namespaced: true,
    state: () => ({
        menus: [],
        pages: [],
        pageForms: new Map(),
        selectedPage: undefined,
        selectedComponent: undefined,
        componentList: [],
    }),
    getters: {
        pages: state => state.pages || [],
        componentList: state => state.componentList || [],
        selectedPage: state => state.selectedPage,
        selectedComponent: state => state.selectedComponent,
        dragComponent: state => state.dragComponent,
        pageForms: state => state.pageForms,
        pageForm: state => (key: string) => state.pageForms.get(key),
    },
    mutations: {
        [commit_designer_import_config](state, payload: payload_designer_import_config) {
            state.pages = payload.pages;
            if (state.pages && state.pages.length) {
                state.selectedPage = state.pages[0];
            }
        },
        [commit_designer_set_componentList](state, payload: payload_designer_set_componentList) {
            state.componentList = payload.list;
        },
        [commit_designer_add_components](state, payload: { list: IDesignerComponent[] }) {
            payload.list.forEach(l => {
                if (!state.componentList.some(c => c.type === l.type)) {
                    state.componentList.push(l);
                }
            });
        },
        [commit_designer_add_page]: (state, payload?: payload_designer_add_page) => {
            const newPage = getDefaultPageModule(state);
            if (payload && payload.page) {
                const _page = { ...newPage, ...payload.page };
                state.pages.push(_page);
            } else {
                const newPage = getDefaultPageModule(state);
                state.pages.push(newPage);
            }
        },
        [commit_designer_delete_page]: (state, payload: { pageKey: string }) => {
            const index = state.pages.findIndex(p => p.key === payload.pageKey);
            console.log('pagekey', payload.pageKey, index);
            if (index > -1) {
                state.pages.splice(index, 1);
            }
        },
        [commit_designer_init_appPages]: (state, payload: payload_designer_init_appPages) => {
            state.pages = payload.pages;
            if (payload.pages.length) {
                state.selectedPage = payload.pages[0];
            }
        },
        [commit_designer_init_designer_page]: state => {
            const newPage = getDefaultPageModule(state);
            newPage.selected = true;
            state.pages.push(newPage);
            state.selectedPage = newPage;
        },
        // 切换所选页面
        [commit_designer_setSelectPage]: (state, payload: payload_designer_setSelectPage) => {
            state.pages.forEach(page => {
                page.selected = page.key === payload.pageId;
                if (page.key === payload.pageId) {
                    state.selectedPage = page;
                }
            });
        },
        // 设计面板拖入组件
        [commit_designer_dragAddComponent]: (state, payload: payload_designer_dragAddComponent) => {
            if (payload.parent) {
                state.selectedComponent = payload.component;
            }
        },
        // 双击添加组件
        [commit_designer_doubleAddComponent]: (
            state,
            payload: payload_designer_doubleAddComponent
        ) => {
            if (payload.parent && payload.component) {
                // 父组件是页面，并且要添加的组件是容器组件时，才可以正常添加
                if (
                    payload.parent.type === EnumComponentType.page &&
                    payload.component.group === EnumComponentGroup.layout
                ) {
                    payload.parent.list?.push(payload.component);
                }
                // 不是页面时，需要父组件是容器组件才能添加
                else if (
                    payload.parent.type !== EnumComponentType.page &&
                    [
                        EnumComponentType.layout,
                        EnumComponentType.form,
                        EnumComponentType.row,
                        EnumComponentType.col,
                    ].some(type => type === payload.parent.type)
                ) {
                    payload.parent.list?.push(payload.component);
                    // state.selectedComponent = payload.component;
                }
            }
        },
        // 设置选中的拖动组件
        [commit_designer_setDragComponent]: (state, payload: payload_designer_setDragComponent) => {
            state.dragComponent = payload.component;
        },
        [commit_designer_selectedComponent]: (
            state,
            payload: payload_designer_selectedComponent
        ) => {
            state.selectedComponent = payload.component;
        },
        // 删除选中的组件
        [commit_designer_deleteComponent]: (state, payload: payload_designer_deleteComponent) => {
            const componentId = payload.id;
            if (state.selectedPage && state.selectedPage.list) {
                // 从当前页面组件列表中查找要删除的组件
                utils.$deleteTreeItem(state.selectedPage.list, componentId);
                state.selectedComponent = undefined;
            }
        },
        // 导入csv文件的组件
        [commit_designer_importCsvData]: (state, payload: payload_designer_importCsvData) => {
            const newPage = {
                ...getDefaultPageModule(state),
                ...{ label: payload.pageName, code: payload.pageCode },
            };
            const rowState = state.componentList.find(c => c.type === EnumComponentType.row);
            if (rowState) {
                // 创建行
                const rowKey = utils.$getUUID(EnumComponentType.row);
                const newRow: IDesignerComponent = {
                    key: rowKey,
                    code: '',
                    label: rowState.label,
                    icon: rowState.icon,
                    group: rowState.group,
                    type: rowState.type,
                    list: [],
                };
                for (const k in payload.data) {
                    const type = payload.data[k];
                    const component = state.componentList.find(c => c.type === type);
                    if (component) {
                        newRow.list!.push({
                            key: utils.$getUUID(component.type),
                            code: '',
                            group: component.group,
                            type: component.type,
                            label: component.label,
                            icon: component.icon,
                            props: {
                                label: k,
                                dense: true,
                            },
                        } as any);
                    }
                }
                if (newPage.list && newPage.list.length) {
                    newPage.list[0].list!.push(newRow);
                    state.pages.push(newPage);
                    return newPage.key;
                }
            }
            return '';
        },
        [commit_designer_setPageForm]: (state, payload: payload_designer_setPageForm) => {
            if (state.pageForms.has(payload.pageForm.key)) {
                const oldPageForm = state.pageForms.get(payload.pageForm.key)!;
                oldPageForm.column = payload.pageForm.column;
                oldPageForm.formId = payload.pageForm.formId;
            } else {
                state.pageForms.set(payload.pageForm.key, payload.pageForm);
            }
        },
    },
    actions: {
        [dispatch_designer_importCsvData](
            { commit, state },
            payload: payload_designer_importCsvData
        ) {
            commit(commit_designer_importCsvData, payload);
            commit(commit_designer_setSelectPage, {
                pageId: state.pages[state.pages.length - 1].key,
            });
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async [dispatch_designer_savePage]({ state }, payload) {
            return apps.appService.updateApp(payload.appId, payload.projectId, payload.app);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async [dispatch_designer_saveForm]({ state }, payload) {
            return forms.formService.addForm(payload.form);
        },
        async [dispatch_designer_save](
            { dispatch },
            payload: { appId: string; projectId: string; app: any; form: any }
        ) {
            return new Promise((ok, fail) => {
                Promise.all([
                    dispatch(dispatch_designer_savePage, {
                        appId: payload.appId,
                        projectId: payload.projectId,
                        app: payload.app,
                    }),
                    dispatch(dispatch_designer_saveForm, { form: payload.form }),
                ])
                    .then(resAll => {
                        if (
                            resAll.length === 2 &&
                            resAll[0].status === EnumServiceResultStatus.success &&
                            resAll[1].status === EnumServiceResultStatus.success
                        ) {
                            ok('');
                        } else {
                            fail('save fail');
                        }
                    })
                    .catch(() => {
                        fail('save fail');
                    });
            });
        },
    },
};

export default DesignerModule;
