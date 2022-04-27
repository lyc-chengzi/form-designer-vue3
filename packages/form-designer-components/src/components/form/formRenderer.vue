<template>
    <form
        :class="{
            ['fd-form']: true,
            ['top-title']: c_Props.topTitle,
        }"
        :ref="state.key"
        :id="state.key"
        :style="c_Css"
        @submit.prevent="submitForm"
    >
        <template v-if="c_isDesignMode">
            <fd-layout
                class="fd-form-layout"
                :state="state"
                :parentId="parentId"
                :pageData="pageData"
                :pageMethod="pageMethod"
            ></fd-layout>
        </template>
        <template v-else>
            <component
                v-for="child in state.list"
                :key="child.key"
                :is="child.type"
                :id="child.key"
                :state="child"
                :parentId="state.key"
                :data-type="child.type"
                :pageData="pageData"
                :pageMethod="pageMethod"
            ></component>
        </template>
    </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { COMPONENTCOMMONPROPS } from '../../constant';
import useBase from '../../composables/base';
import useForm from '../../composables/form';
import { forms } from 'form-designer-utils/service';
import { funcFactory, propsFactory, utils } from 'form-designer-utils';

import { IServiceResult } from 'form-designer-types/interface/request';
import { IFormField } from 'form-designer-types/interface/components/form';

import { EnumServiceResultStatus } from 'form-designer-types/enum/request';
import { EnumComponentType } from 'form-designer-types/enum/components';
import { EnumAppMode } from 'form-designer-types/enum';

export default defineComponent({
    name: EnumComponentType.form,
    props: COMPONENTCOMMONPROPS,
    setup(props) {
        const base = useBase(props as any);
        const form = useForm(props as any);
        return {
            ...base,
            ...form,
        };
    },
    // mixins: [baseMixins],
    provide() {
        const $this = this;
        return {
            getFdFormRef() {
                return $this;
            },
            getFdFormFields() {
                return $this.formFields;
            },
        };
    },
    data() {
        return {
            formFields: [] as IFormField[],
            valid: false,
        };
    },
    methods: {
        // 提交form表单
        async submitForm() {
            const formRef = this.$refs[this.state.key] as any;
            if (formRef) {
                const valid = formRef.validate();
                if (valid) {
                    const submitData = {} as any;
                    this.formFields.forEach(f => {
                        submitData[f.key] = propsFactory.getPropsValue(f.state, 'value');
                    });
                    const ff = funcFactory.init();
                    const appInfo = ff.getAppInfo();
                    let res: IServiceResult;
                    if (this.getAppMode() === EnumAppMode.add) {
                        res = await forms.formDataService.addFormData({
                            projectId: appInfo.projectId,
                            appId: appInfo.appId,
                            formId: this.c_Props.formId || '',
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
                        this.formSubmited && this.formSubmited(true, '');
                    } else {
                        this.formSubmited && this.formSubmited(false, res.message);
                    }
                } else {
                    this.formSubmited && this.formSubmited(false, '验证失败');
                }
            }
        },
    },
});
</script>
