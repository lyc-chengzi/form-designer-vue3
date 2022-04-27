import { EnumCssProerty } from 'form-designer-types/enum/components';
import { IComponentState } from 'form-designer-types/interface/components';
import { utils } from 'form-designer-utils';
import { apiDomain } from 'form-designer-utils/service';
import { ref, computed, watch } from 'vue';

export default function useBaseMethods<T extends IComponentState>(state: T) {
    // 监听自定义样式
    @Watch(`state.${EnumCssProerty.styleText}`, { immediate: true })
    styleTextChange(value: string, oldValue: string) {
        if (state && value !== oldValue) {
            utils.$createDynamicStyle(this.state.key, value);
        }
    }

    
}
