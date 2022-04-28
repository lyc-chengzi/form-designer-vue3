import { EnumAppMode } from 'form-designer-types/enum';
import Vue, { inject } from 'vue';

export default function useBaseInject() {
    // 向页面注册组件
    const addComponent = inject(
        'addComponent',
        (key: string, componentInstance: Vue.ComponentInternalInstance) => {
            console.log('inject: addComponent ------------->', key, componentInstance);
        }
    );
    // 从页面中删除组件
    const removeComponent = inject('removeComponent', (key: string) => {
        console.log('inject: removeComponent ------------->', key);
    });
    // 获取页面种的某个组件
    const getComponentByKey = inject('getComponentByKey', (key: string) => {
        console.log('inject: getComponentByKey ------------->', key);
        return undefined as Vue.ComponentPublicInstance | undefined;
    });
    // 获取app模式
    const getAppMode = inject('getAppMode', () => {
        console.log('inject: getAppMode ------------->');
        return EnumAppMode.view as EnumAppMode;
    });
    // 获取当前页面的实例
    const getPageInstance = inject('getPageInstance', () => {
        console.log('inject: getPageInstance ------------->');
        return undefined as Vue.ComponentPublicInstance | undefined;
    });
    return {
        addComponent,
        removeComponent,
        getComponentByKey,
        getAppMode,
        getPageInstance,
    };
}
