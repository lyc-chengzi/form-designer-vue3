import { EnumRuleType } from 'form-designer-types/enum/components/form';
import { IComponentState } from 'form-designer-types/interface/components';
import {
    IFieldCallbackRule,
    IFormInfo,
    IFormRules,
} from 'form-designer-types/interface/components/form';

const formFactory = {
    getFormInfoValue: <PropsType, K extends keyof IFormInfo>(
        state: IComponentState<PropsType>,
        key: K
    ): IFormInfo[K] | undefined => {
        if (state && state.formInfo) {
            if (Object.prototype.hasOwnProperty.call(state.formInfo, key)) {
                return state.formInfo[key];
            } else return undefined;
        } else return undefined;
    },
    setFormInfoValue: <PropsType>(
        state: IComponentState<PropsType>,
        key: keyof IFormInfo,
        value: any
    ) => {
        if (state.formInfo) {
            state.formInfo[key] = value;
        } else {
            // @ts-ignore
            state.formInfo = { [key]: value };
        }
    },
    // 数组数据，添加数据
    pushFormValue: <PropsType>(
        state: IComponentState<PropsType>,
        key: keyof IFormInfo,
        value: any
    ) => {
        if (state) {
            if (state.formInfo) {
                // 如果已经有数据，直接push
                if (Object.prototype.hasOwnProperty.call(state.formInfo, key)) {
                    // @ts-ignore
                    state.formInfo[key].push(value);
                } else {
                    // @ts-ignore
                    state.formInfo[key] = [value];
                }
            } else {
                // @ts-ignore
                state.formInfo = { [key]: [value] };
            }
        }
    },
    // 数组数据，删除数据
    removeFormValue<PropsType>(
        state: IComponentState<PropsType>,
        key: keyof IFormInfo,
        index: number
    ) {
        if (state) {
            const data = this.getFormInfoValue(state, key) as any[] | undefined;
            if (data && data instanceof Array && data.length > index) {
                data.splice(index, 1);
            }
        }
    },
    formatRules(_rules?: IFormRules[]) {
        if (_rules && _rules.length > 0) {
            const rules: IFieldCallbackRule[] = [];
            _rules.forEach(_rule => {
                // 邮箱校验
                if (_rule.ruleType === EnumRuleType.email) {
                    const regExp =
                        /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+\.[a-z]{2,3}(\.[a-z]{2})?$/i;
                    const callback = (email: string) => regExp.test(email) || _rule.message;
                    rules.push(callback);
                }
                // 整数校验
                else if (_rule.ruleType === EnumRuleType.integer) {
                    const regExp = /^[0-9]+$/gi;
                    const callback = (value: string) => regExp.test(value) || _rule.message;
                    rules.push(callback);
                }
                // 长度校验
                else if (_rule.ruleType === EnumRuleType.maxLength) {
                    const callback = (v: string) => {
                        return (v && v.length <= Number(_rule.regText)) || _rule.message;
                    };
                    rules.push(callback);
                }
                // 数字校验
                else if (_rule.ruleType === EnumRuleType.number) {
                    const regExp = /^-?\d+\.?\d*$/gi;
                    const callback = (email: string) => regExp.test(email) || _rule.message;
                    rules.push(callback);
                }
                // 正则校验
                else if (_rule.ruleType === EnumRuleType.regExp) {
                    const regExp = new RegExp(_rule.regText || '');
                    const callback = (value: string) => regExp.test(value) || _rule.message;
                    rules.push(callback);
                }
                // 必填校验
                else if (_rule.ruleType === EnumRuleType.required) {
                    const callback = (value: string) => !!value || _rule.message;
                    rules.push(callback);
                }
            });
            return rules;
        } else return [];
    },
};

export default formFactory;
