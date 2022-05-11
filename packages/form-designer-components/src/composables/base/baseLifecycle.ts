import Vue from 'vue';
import { ISetupBaseProps } from 'form-designer-types/interface/components';
import { onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';
import useInject from './baseInject';

export default function useBaseLifecycle(props: ISetupBaseProps) {
    const { addComponent, removeComponent } = useInject();
    onMounted(() => {
        const internalInstance = getCurrentInstance();
        // 组件挂载后向页面中注册组件实例
        if (addComponent && internalInstance) {
            addComponent(props.state.key, internalInstance);
        }
    });
    onBeforeUnmount(() => {
        // 组件销毁前删除实例
        if (removeComponent) {
            removeComponent(props.state.key);
        }
    });
}
