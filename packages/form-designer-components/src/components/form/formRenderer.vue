<template>
    <form
        :class="{
            ['fd-form']: true,
            ['top-title']: c_Props.topTitle,
        }"
        ref="formRef"
        :id="props.state.key"
        :style="c_Css"
        @submit.prevent="submitForm"
    >
        <fd-layout :state="props.state" parentId=""></fd-layout>
    </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { EnumComponentType } from 'form-designer-types/enum/components';

export default defineComponent({
    name: EnumComponentType.form,
});
</script>
<script lang="ts" setup>
import { provide, reactive, ref, getCurrentInstance, defineProps } from 'vue';
import useBase from '../../composables/base';
import useForm from '../../composables/form';
import { getFdFormRef, getFdFormFields } from 'form-designer-types/constant/injectKeys';
import { forms } from 'form-designer-utils/service';
import { funcFactory, propsFactory, utils } from 'form-designer-utils';

import { IServiceResult } from 'form-designer-types/interface/request';
import { IFormField } from 'form-designer-types/interface/components/form';

import { EnumServiceResultStatus } from 'form-designer-types/enum/request';
import { EnumAppMode } from 'form-designer-types/enum';
import { IComponentState } from 'form-designer-types/interface/components';

const internalInstance = getCurrentInstance();
const props = defineProps<{
    state: IComponentState;
    parentId: string;
}>();
const { c_Props, c_Css, c_isDesignMode, getAppMode } = useBase(props);
const { formSubmited } = useForm(props);
const formFields = reactive<IFormField[]>([]);
const valid = ref(false);
const formRef = ref<HTMLFormElement | null>(null);

provide(getFdFormRef, () => {
    return internalInstance || undefined;
});
provide(getFdFormFields, () => {
    return formFields;
});

// 提交form表单
const submitForm = async () => {
    if (formRef.value) {
        valid.value = formRef.value.validate();
        if (valid.value) {
            const submitData = {} as any;
            formFields.forEach(f => {
                submitData[f.key] = propsFactory.getPropsValue(f.state, 'value');
            });
            const ff = funcFactory.init();
            const appInfo = ff.getAppInfo();
            let res: IServiceResult;
            if (getAppMode() === EnumAppMode.add) {
                res = await forms.formDataService.addFormData({
                    projectId: appInfo.projectId,
                    appId: appInfo.appId,
                    formId: c_Props.value.formId || '',
                    content: submitData,
                });
            } else {
                res = await forms.formDataService.updateFormData({
                    id:
                        utils.$getQueryString('formContentId') ||
                        localStorage.getItem('fd_formContentId') ||
                        '',
                    content: submitData,
                });
            }
            if (res.status === EnumServiceResultStatus.success) {
                formSubmited && formSubmited(true, '');
            } else {
                formSubmited && formSubmited(false, res.message);
            }
        } else {
            formSubmited && formSubmited(false, '验证失败');
        }
    }
};
</script>
