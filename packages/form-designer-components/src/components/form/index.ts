import { EnumComponentGroup, EnumComponentType } from 'form-designer-types/enum/components';
import { EnumPropsSelector } from 'form-designer-types/enum/designer';
import { IDesignerComponent, registerComponentFunc } from 'form-designer-types/interface/designer';
import './form.less';
import { IFormProps } from './interface';

import Form from './formRenderer.vue';

export default Form;

export const register: registerComponentFunc = function () {
    const form: IDesignerComponent<IFormProps> = {
        key: '',
        code: '',
        label: '表单',
        icon: 'form',
        group: EnumComponentGroup.layout,
        type: EnumComponentType.form,
        order: 200,
        list: [],
        propsConfigs: [
            { key: 'name', label: '表单名', selector: EnumPropsSelector.input },
            { key: 'topTitle', label: 'title上方显示', selector: EnumPropsSelector.switch },
        ],
    };
    return form;
};
