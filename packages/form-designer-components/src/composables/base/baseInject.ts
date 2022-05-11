import { EnumAppMode } from 'form-designer-types/enum';
import FdComponent from '../../component';
import {
    addComponent,
    removeComponent,
    getComponentByKey,
    getAppMode,
    getPageInstance,
} from 'form-designer-types/constant/injectKeys';

import Vue, { inject, ComponentInternalInstance } from 'vue';

export default function useBaseInject() {
    // 向页面注册组件
    const addComponent_provide = inject(
        addComponent,
        (key: string, componentInstance: ComponentInternalInstance) => {
            console.log('inject default: addComponent ------------->', key, componentInstance);
        }
    );
    // 从页面中删除组件
    const removeComponent_provide = inject(removeComponent, (key: string) => {
        console.log('inject default: removeComponent ------------->', key);
    });
    // 获取页面种的某个组件
    const getComponentByKey_provide = inject(getComponentByKey, (key: string) => {
        console.log('inject default: getComponentByKey ------------->', key);
        return undefined as FdComponent | undefined;
    });
    // 获取app模式
    const getAppMode_provide = inject(getAppMode, () => {
        console.log('inject default: getAppMode ------------->');
        return EnumAppMode.view as EnumAppMode;
    });
    // 获取当前页面的实例
    const getPageInstance_provide = inject(getPageInstance, () => {
        console.log('inject default: getPageInstance ------------->');
        return undefined as Vue.ComponentPublicInstance | undefined;
    });
    return {
        addComponent: addComponent_provide,
        removeComponent: removeComponent_provide,
        getComponentByKey: getComponentByKey_provide,
        getAppMode: getAppMode_provide,
        getPageInstance: getPageInstance_provide,
    };
}
