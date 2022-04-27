import { IComponentState } from 'form-designer-types/interface/components';
import { computed } from 'vue';

export default function useBaseComputed<T extends IComponentState>(state: T) {
    const _Css = computed(() => {
        return {
            ...{
                margin: 'auto',
                padding: 'auto',
            },
            ...state.css,
        };
    });
    return {
        _Css,
    };
}
