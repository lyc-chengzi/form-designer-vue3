/**
    组件基础功能
 */
import { defineComponent } from 'vue';
// import useBaseInject from '../composables/base/baseInject';
import { EnumCssProerty } from 'form-designer-types/enum/designer';
// import { EnumApiType, EnumEventType } from 'form-designer-types/enum/components';

// import { IServiceResult } from 'form-designer-types/interface/request';

import { utils } from 'form-designer-utils';
// import { apiDomain } from 'form-designer-utils/service';
// import FdComponent from '../component';
// import { EnumAppMode } from 'form-designer-types/enum';
// import { IComponentState } from 'form-designer-types/interface/components';

const baseMixin = defineComponent({
    watch: {
        [`state.${EnumCssProerty.styleText}`]: {
            immediate: true,
            handler(value: string, oldValue: string) {
                // @ts-ignore
                if (this.state && value !== oldValue) {
                    // @ts-ignore
                    utils.$createDynamicStyle(this.state.key, value);
                }
            },
        },
    },
});

export default baseMixin;
