import {
    EnumComponentGroup,
    EnumComponentType,
    EnumPropsValueType,
} from 'form-designer-types/enum/components';
import { IDesignerComponent, registerComponentFunc } from 'form-designer-types/interface/designer';
import { IRateProps } from './interface';
import Rate from './rateRenderer.vue';
export default Rate;

export const register: registerComponentFunc = function () {
    const rate: IDesignerComponent<IRateProps> = {
        key: '',
        code: '',
        label: '评分',
        icon: 'Ratings',
        group: EnumComponentGroup.form,
        type: EnumComponentType.rate,
        listGroup: 'business',
        order: 307,
        getDefaultProps: () => {
            return {
                label: {
                    type: EnumPropsValueType.string,
                    value: '',
                },
                defaultValue: {
                    type: EnumPropsValueType.number,
                    value: 3,
                },
            };
        },
    };
    return rate;
};
