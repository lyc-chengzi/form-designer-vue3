import { inject } from 'vue';
export default function useFormInject() {
    // 获取当前form实例
    const getFdForm = inject<any>('getFdFormRef', () => {
        console.log('inject getFdForm -------->');
        return undefined;
    });
    // 获取所有form字段组件
    type getFormFieldsType = () => any[];
    const getFormFields = inject<getFormFieldsType>('getFdFormFields', () => {
        console.log('inject $getFormFields -------->');
        return [];
    });

    type formSubmitedType = (success: boolean, message: string) => void;
    const formSubmited: formSubmitedType = inject('formSubmited', () => () => {
        console.log('inject formSubmited --------->');
    });

    return {
        getFdForm,
        getFormFields,
        formSubmited,
    };
}
