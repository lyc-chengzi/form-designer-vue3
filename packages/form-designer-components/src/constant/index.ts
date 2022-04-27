import { IComponentState } from 'form-designer-types/interface/components';
import { PropType } from 'vue';

export const COMPONENTCOMMONPROPS = {
    state: {
        required: true,
        type: Object as PropType<IComponentState>,
        default: () => ({}),
    },
    parentId: {
        type: String,
        required: true,
        default: () => '',
    },
    pageData: {
        type: Object,
        required: true,
        default: () => ({}),
    },
    pageMethod: {
        type: Object,
        required: true,
        default: () => ({}),
    },
};
