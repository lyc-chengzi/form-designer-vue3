import Vue from 'vue';
import { EnumHttpMethod } from '../../enum';
import {
    EnumComponentType,
    EnumComponentGroup,
    EnumApiType,
    EnumEventType,
    EnumPropsValueType,
} from '../../enum/components';
import { IFormInfo } from './form';

// setup中公共部分props的定义
export interface ISetupBaseProps {
    state: IComponentState;
    parentId: string;
    pageData: Record<string, any>;
    pageMethod: Record<string, any>;
}

/* form组件基础属性定义 */
export interface IBaseFormItemProps {
    label: string;
    show?: boolean;
    visibility?: boolean;
    dense?: boolean;
    disabled?: boolean;
    value?: any;
}
export type IComponentProps<P> = {
    [key in keyof P]: {
        value: P[key];
        type: EnumPropsValueType;
    };
};
export interface IComponentState<P = any, C = Record<string, string | undefined>> {
    key: string;
    code: string /* 别名，一般用于用户给组件定义，方便调用 */;
    type: EnumComponentType;
    group: EnumComponentGroup;
    list?: IComponentState[];
    apis?: IComponentApi[];
    props?: IComponentProps<P>;
    formInfo?: IFormInfo;
    css?: C;
    styleText?: string;
    events?: IComponentEvent[];
}

export interface IComponentApi {
    name: string;
    path: string;
    method: EnumHttpMethod;
    type: EnumApiType;
}

export interface IComponentEvent {
    eventType: EnumEventType;
    funcName: string;
    funcStr: string;
}

export type IComponentEventFunction = ($event: Event, component: Vue) => void;
