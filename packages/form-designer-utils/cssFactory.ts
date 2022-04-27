import { EnumCssProerty } from 'form-designer-types/enum/designer';
import { IComponentState } from 'form-designer-types/interface/components';

const CssFactory = {
    // 获取css值
    getCssValue(state: IComponentState, propertyName: EnumCssProerty) {
        if (state && propertyName === EnumCssProerty.styleText) {
            return state.styleText;
        }
        if (state && state.css) {
            if (Object.prototype.hasOwnProperty.call(state.css, propertyName)) {
                return state.css[propertyName];
            } else {
                return undefined;
            }
        }
        return undefined;
    },
    // 设置css属性
    setCssValue(
        state: IComponentState,
        propertyName: EnumCssProerty,
        value: string | undefined
    ): void {
        if (state && propertyName) {
            if (propertyName === EnumCssProerty.styleText) {
                state[propertyName] = value;
            } else {
                if (state.css) {
                    state.css[propertyName] = value;
                } else {
                    state.css = { [propertyName]: value };
                }
            }
        }
    },
};

export default CssFactory;
