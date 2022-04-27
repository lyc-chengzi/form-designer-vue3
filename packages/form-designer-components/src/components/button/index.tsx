import {
    EnumComponentGroup,
    EnumComponentType,
    EnumPropsValueType,
} from 'form-designer-types/enum/components';
import { EnumCssProerty, EnumPropsSelector } from 'form-designer-types/enum/designer';
import { IDesignerComponent, registerComponentFunc } from 'form-designer-types/interface/designer';
import { IButtonProps } from './interface';

import Button from './buttonRenderer.vue';

export default Button;

export const register: registerComponentFunc = function () {
    const button: IDesignerComponent<IButtonProps> = {
        key: '',
        code: '',
        label: '按钮',
        icon: 'button',
        group: EnumComponentGroup.form,
        type: EnumComponentType.button,
        order: 302,
        getDefaultProps: () => {
            return {
                text: {
                    type: EnumPropsValueType.string,
                    value: '按钮',
                },
                htmlType: {
                    type: EnumPropsValueType.string,
                    value: 'button',
                },
            };
        },
        cssConfigs: [EnumCssProerty.width],
        propsConfigs: [
            {
                key: 'text',
                label: '按钮文本',
                selector: [EnumPropsSelector.bindData],
            },
            {
                key: 'ghost',
                label: '幽灵模式',
                selector: EnumPropsSelector.switch,
            },
            {
                key: 'type',
                label: '按钮类型',
                selector: EnumPropsSelector.select,
                selectOptions: [
                    { key: '', label: '默认' },
                    { key: 'primary', label: 'primary' },
                    { key: 'dashed', label: 'dashed' },
                    { key: 'danger', label: 'danger' },
                    { key: 'link', label: 'link' },
                ],
            },
            {
                key: 'htmlType',
                label: '属性类型',
                selector: EnumPropsSelector.select,
                selectOptions: [
                    { key: '', label: '请选择' },
                    { key: 'submit', label: '提交按钮' },
                    { key: 'button', label: '普通按钮' },
                ],
            },
            {
                key: 'shape',
                label: 'shape',
                selector: (state, propsFactory) => {
                    return (
                        <a-input
                            value={propsFactory.getPropsValue(state, 'shape')}
                            onChange={(e: any) => {
                                propsFactory.setPropsValue(state, 'shape', e.target.value);
                            }}
                        ></a-input>
                    );
                },
            },
        ],
    };
    return button;
};
