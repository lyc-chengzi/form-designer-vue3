import { EnumAppMode } from 'form-designer-types/enum';
import { ISetupBaseProps } from 'form-designer-types/interface/components';
import { utils } from 'form-designer-utils';
import { watch } from 'vue';

export default function useBaseWatch(
    props: ISetupBaseProps,
    params: {
        appMode: EnumAppMode;
    }
) {
    if (params.appMode === EnumAppMode.design) {
        watch(
            props.state,
            newState => {
                // 监听styleText，用户自定义样式字段
                if (newState.styleText) {
                    console.log('styleText watch', newState.styleText);
                    utils.$createDynamicStyle(props.state.key, newState.styleText);
                }
            },
            {
                immediate: true,
            }
        );
    }
}
