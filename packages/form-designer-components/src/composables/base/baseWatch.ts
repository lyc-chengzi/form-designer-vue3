import { watch, reactive, watchEffect } from 'vue';
import { EnumAppMode } from 'form-designer-types/enum';
import { ISetupBaseProps } from 'form-designer-types/interface/components';
import { utils } from 'form-designer-utils';
import useInject from './baseInject';

export default function useBaseWatch(props: ISetupBaseProps) {
    const { getAppMode } = useInject();
    if (getAppMode() === EnumAppMode.design) {
        /*
        watch(
            reactive(props.state),
            newState => {
                // 监听styleText，用户自定义样式字段
                if (newState.styleText) {
                    console.log('styleText watch', newState.styleText);
                    utils.$createDynamicStyle(props.state.key, newState.styleText);
                }
            }
            // reactive 默认开启immediate
            // {
            //     immediate: true,
            // }
        );
        */
        watchEffect(() => {
            if (props.state.styleText) {
                console.log('styleText watcheffect', props.state.key, props.state.styleText);
                utils.$createDynamicStyle(props.state.key, props.state.styleText);
            }
        });
    }
}
