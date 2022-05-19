import { EnumAppMode } from 'form-designer-types/enum';
import FdComponent from '../../component';
import {
    addComponent,
    removeComponent,
    getComponentByKey,
    getAppMode,
    // pageData,
    // pageMethods,
} from 'form-designer-types/constant/injectKeys';

import { inject, ComponentInternalInstance } from 'vue';

export default function useBaseInject() {
    return {
        // 向页面注册组件
        addComponent: inject(
            addComponent,
            (key: string, componentInstance: ComponentInternalInstance) => {
                console.log('inject default: addComponent ------------->', key, componentInstance);
            }
        ),
        // 从页面中删除组件

        removeComponent: inject(removeComponent, (key: string) => {
            console.log('inject default: removeComponent ------------->', key);
        }),
        // 获取页面种的某个组件
        getComponentByKey: inject(getComponentByKey, (key: string) => {
            console.log('inject default: getComponentByKey ------------->', key);
            return undefined as FdComponent | undefined;
        }),
        getAppMode: inject(getAppMode, () => {
            console.log('inject default: getAppMode ------------->');
            return EnumAppMode.view as EnumAppMode;
        }),
        // pageData: inject(pageData, () => {
        //     console.log('inject default: pageData ------------->');
        //     return {};
        // }),
        // pageMethods: inject(pageMethods, () => {
        //     console.log('inject default: pageMethods ------------->');
        //     return {};
        // }),
    };
}
