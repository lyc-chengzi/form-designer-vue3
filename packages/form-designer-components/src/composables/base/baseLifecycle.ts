import Vue from 'vue';
import { ISetupBaseProps } from 'form-designer-types/interface/components';
import { onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';

type paramsType = {
    addComponent: (key: string, componentInstance: Vue.ComponentInternalInstance) => void;
    removeComponent: (key: string) => void;
};

export default function useBaseLifecycle(props: ISetupBaseProps, params: paramsType) {
    onMounted(() => {
        const internalInstance = getCurrentInstance();
        // 组件挂载后向页面中注册组件实例
        if (params.addComponent) {
            params.addComponent(props.state.key, internalInstance!);
        }
    });
    onBeforeUnmount(() => {
        // 组件销毁前删除实例
        if (params.removeComponent) {
            params.removeComponent(props.state.key);
        }
    });
}
