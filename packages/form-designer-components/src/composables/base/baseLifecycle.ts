import { ISetupBaseProps } from 'form-designer-types/interface/components';
import { onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';

type paramsType = {
    addComponent: any;
    removeComponent: any;
};

export default function useBaseLifecycle(props: ISetupBaseProps, params: paramsType) {
    const internalInstance = getCurrentInstance();
    onMounted(() => {
        // 组件挂载后向页面中注册组件实例
        if (params.addComponent) {
            params.addComponent(props.state.key, internalInstance);
        }
    });
    onBeforeUnmount(() => {
        // 组件销毁前删除实例
        if (params.removeComponent) {
            params.removeComponent(props.state.key);
        }
    });
}
