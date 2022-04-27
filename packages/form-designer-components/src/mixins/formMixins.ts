import { defineComponent, PropType } from 'vue';
// import { IFieldCallbackRule, IFormRules } from 'form-designer-types/interface/components/form';
import { IComponentState } from 'form-designer-types/interface/components';
// import { formFactory } from 'form-designer-utils';

export default defineComponent({
    props: {
        state: {
            required: true,
            type: Object as PropType<IComponentState>,
        },
        parentId: {
            type: String,
            required: true,
            default: () => '',
        },
    },
    // setup() {
    //     // 获取当前form实例
    //     const $getFdForm = inject('getFdFormRef', () => undefined as any);
    //     const $getFormFields = inject('getFdFormFields', () => [] as any[]);
    //     return {
    //         $getFdForm,
    //         $getFormFields,
    //     };
    // },
    // created() {
    //     // 创建组件时，添加对应的field字段
    //     if (!this.$getFormFields) return;
    //     const $fields = this.$getFormFields();
    //     $fields.push({
    //         key: this.state.key,
    //         name: this.state.code,
    //         type: this.state.type,
    //         state: this.state,
    //         instance: this,
    //         rules: [],
    //     });
    // },
    // beforeUnmount() {
    //     // 销毁前，删除对应的field字段
    //     if (!this.$getFormFields) return;
    //     const $fields = this.$getFormFields();
    //     const index = $fields.findIndex(field => field.key === this.state.key);
    //     if (index > -1) {
    //         $fields.splice(index, 1);
    //     }
    // },
    // computed: {
    //     fieldRules(): IFieldCallbackRule[] {
    //         if (!this.state.formInfo) return [];
    //         return formFactory.formatRules(this.state.formInfo!.rules);
    //     },
    // },
    // watch: {
    //     'state.formInfo.formFieldName': {
    //         immediate: true,
    //         handler(value: string) {
    //             if (!this.$getFormFields) return;
    //             const $fields = this.$getFormFields();
    //             for (let index = 0; index < $fields.length; index++) {
    //                 const field = $fields[index];
    //                 if (field.key === this.state.key) {
    //                     field.name = value;
    //                     break;
    //                 }
    //             }
    //         },
    //     },
    //     'state.formInfo.rules': {
    //         immediate: true,
    //         handler(value: IFormRules[]) {
    //             if (!this.$getFormFields) return;
    //             const $fields = this.$getFormFields();
    //             for (let index = 0; index < $fields.length; index++) {
    //                 const field = $fields[index];
    //                 if (field.key === this.state.key) {
    //                     field.rules = value;
    //                     break;
    //                 }
    //             }
    //         },
    //     },
    // },
});
