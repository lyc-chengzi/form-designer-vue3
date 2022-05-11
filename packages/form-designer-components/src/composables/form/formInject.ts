import { inject } from 'vue';
import {
    formSubmited,
    getFdFormFields,
    getFdFormRef,
} from 'form-designer-types/constant/injectKeys';
export default function useFormInject() {
    // 获取当前form实例
    const getFdForm = inject(getFdFormRef, () => {
        return undefined;
    });
    // 获取所有form字段组件
    const getFormFields = inject(getFdFormFields, () => {
        return [];
    });

    const _formSubmited = inject(formSubmited, null);

    return {
        getFdForm,
        getFormFields,
        formSubmited: _formSubmited,
    };
}
