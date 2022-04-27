import Vue from 'vue';
import { EnumComponentType } from '../../enum/components';
import { EnumRuleType } from '../../enum/components/form';
import { IComponentState } from './index';

export interface IFormInfo {
    formFieldName: string;
    rules?: IFormRules[];
}

export interface IFormField {
    key: string; // 组件id
    name: string; // 字段名
    type: EnumComponentType;
    state: IComponentState;
    instance: Vue;
    rules: IFormRules[]; // 校验规则
}

export interface IFormRules {
    ruleType: EnumRuleType;
    message: string;
    regText?: string;
}

export type IFieldCallbackRule = (value: any) => string | boolean;
