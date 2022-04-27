import { defineComponent, PropType, VNode } from 'vue';
import './index.less';
import { EnumRuleType } from 'form-designer-types/enum/components/form';
import { formFactory } from 'form-designer-utils';
import { EnumComponentGroup, EnumComponentType } from 'form-designer-types/enum/components';
import { DeleteFilled } from '@ant-design/icons-vue';
import { IFormRules } from 'form-designer-types/interface/components/form';
import { IDesignerComponent } from 'form-designer-types/interface/designer';

export default defineComponent({
    name: 'designer-form-panel',
    props: {
        element: {
            type: Object as PropType<IDesignerComponent>,
            required: false,
        },
    },
    methods: {
        // 渲染form 规则
        renderFormRules(): VNode[] {
            const rules: IFormRules[] =
                (formFactory.getFormInfoValue(this.element!, 'rules') as IFormRules[]) || [];
            if (rules.length) {
                return rules.map((rule, index) => {
                    return (
                        <li class="rule-item" key={index}>
                            {/* <!--选择规则类型--> */}
                            <a-select slot="addonBefore" v-model={rule.ruleType}>
                                <a-select-option value="">请选择</a-select-option>
                                <a-select-option value={EnumRuleType.required}>
                                    必选
                                </a-select-option>
                                <a-select-option value={EnumRuleType.maxLength}>
                                    最大长度
                                </a-select-option>
                                <a-select-option value={EnumRuleType.number}>
                                    数字类型
                                </a-select-option>
                                <a-select-option value={EnumRuleType.integer}>整数</a-select-option>
                                <a-select-option value={EnumRuleType.email}>邮箱</a-select-option>
                                <a-select-option value={EnumRuleType.regExp}>正则</a-select-option>
                            </a-select>
                            {/* <!--输入错误提示--> */}
                            <a-input v-model={rule.message} placeholder="错误提示信息" />
                            {/* <!--限制长度--> */}
                            {rule.ruleType === EnumRuleType.maxLength ? (
                                <a-input placeholder="请输入数字" v-model={rule.regText} />
                            ) : null}
                            {/* <!--限制长度--> */}
                            {rule.ruleType === EnumRuleType.regExp ? (
                                <a-input placeholder="请输入正则表达式" v-model={rule.regText} />
                            ) : null}
                            <DeleteFilled
                                onClick={() =>
                                    formFactory.removeFormValue(this.element!, 'rules', index)
                                }
                            />
                        </li>
                    );
                });
            } else {
                return [];
            }
        },
        // 渲染form 信息
        renderFormInfo(): VNode | undefined {
            if (this.element) {
                // 只有form group组件，并且不是form、col、row才显示form属性
                const showFormInfoConfig =
                    this.element.group === EnumComponentGroup.form &&
                    ![EnumComponentType.form, EnumComponentType.row, EnumComponentType.col].some(
                        type => type === this.element?.type
                    );
                if (showFormInfoConfig) {
                    return (
                        <div class="section section-form">
                            <div class="item">
                                <div class="label">字段名</div>
                                <div class="value">
                                    <a-input
                                        value={formFactory.getFormInfoValue(
                                            this.element!,
                                            'formFieldName'
                                        )}
                                        onChange={(e: any) => {
                                            formFactory.setFormInfoValue(
                                                this.element!,
                                                'formFieldName',
                                                e.target.value
                                            );
                                        }}
                                    ></a-input>
                                </div>
                            </div>
                            <div class="item">
                                <div class="label">校验规则</div>
                                <div class="value">
                                    <ul>
                                        {this.renderFormRules()}
                                        <a-button
                                            type="primary"
                                            onClick={() => {
                                                formFactory.pushFormValue(this.element!, 'rules', {
                                                    ruleType: '',
                                                    message: '',
                                                    regText: '',
                                                });
                                            }}
                                        >
                                            添加规则
                                        </a-button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                } else return undefined;
            } else return undefined;
        },
    },
    render() {
        return this.renderFormInfo();
    },
});
