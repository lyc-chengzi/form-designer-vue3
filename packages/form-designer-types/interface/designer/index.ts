import { VNode } from 'vue';
import { IComponentProps, IComponentState } from '../components';
import { IPageProps } from '../components/page';
import { IPageForm } from './pageForm';

import { EnumAppMode } from '../../enum';
import { EnumCssProerty, EnumPropsSelector } from '../../enum/designer';
import { EnumPropsValueType } from '../../enum/components';

// 设计模式下组件的属性
export interface IDesignerComponent<P = any, C = Record<string, string>>
    extends IComponentState<P, C> {
    order?: number;
    label: string;
    icon?: string;
    listGroup?: 'normal' | 'business' | 'high';
    propsConfigs?: IPropsConfig<P>[];
    cssConfigs?: EnumCssProerty[];
    showInList?: boolean;
    getDefaultProps?: () => IComponentProps<P>;
    getDefaultCss?: () => C;
}

export type propsValueType<P> = P[keyof P] | undefined | null;
type selectOptions = {
    key: string;
    label: string;
};

// 属性渲染工厂定义
export interface IPropsRenderFactory {
    getPropsValue: <P, K extends keyof P>(
        state: IComponentState<P>,
        propertyName: K
    ) => P[K] | undefined;
    setPropsValue: <P, K extends keyof P>(
        state: IComponentState<P>,
        propertyName: K,
        value: P[K] | undefined,
        type?: EnumPropsValueType
    ) => void;
    pushPropsValue: <P, K extends keyof P>(
        state: IComponentState<P>,
        propertyName: K,
        value: any
    ) => void;
    removePropsValue: <P, K extends keyof P>(
        state: IComponentState<P>,
        propertyName: K,
        index: number
    ) => void;
    formatProps: <P>(
        props: IComponentProps<P>,
        getExpression: (expression: any) => any,
        getFunction: (value: string) => Function
    ) => P;
}

// 属性选择器render函数定义
export type IPropsSelectorRender<P> = (
    state: IDesignerComponent<P>,
    propsFactory: IPropsRenderFactory
) => VNode;

export type propsSelectorType<P> = EnumPropsSelector | IPropsSelectorRender<P>;

// 属性配置定义
export type IPropsConfig<P = any> = {
    key: keyof P;
    label: string;
    selector: propsSelectorType<P> | propsSelectorType<P>[];
    selectOptions?: selectOptions[];
    sliderMin?: number;
    sliderMax?: number;
};

export type registerComponentFunc<P = any> = () => IDesignerComponent<P> | IDesignerComponent<P>[];

// page Module对象定义
export interface IPageModuleState extends IDesignerComponent<IPageProps> {
    submitState: 'unsaved' | 'saved' | 'submited';
    selected?: boolean;
}

// App Module对象定义
export interface IAppModuleState {
    itcode: string;
    access: boolean;
    mode: EnumAppMode;
    appInfo: IAppModuleStateAppInfo;
}

export interface IAppModuleStateAppInfo {
    projectId: string;
    appId: string;
    appName: string;
    appDescription: string;
}

export interface IDesignerModuleState {
    menus: any[];
    pages: IPageModuleState[]; // 所有页面
    pageForms: Map<string, IPageForm>;
    selectedPage?: IPageModuleState; // 当前显示页面
    // selectedPageComponentList: IDesignerComponent[]; // 当前页面所有组件列表
    selectedComponent?: IDesignerComponent; // 当前页面所选择的组件
    dragComponent?: IDesignerComponent;
    componentList: IDesignerComponent[]; // 所有组件列表，用于左侧拖动面板展示
}
