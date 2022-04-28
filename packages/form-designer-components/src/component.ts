import Vue from 'vue';
import { EnumCssProerty } from 'form-designer-types/enum/designer';

import { IComponentState } from 'form-designer-types/interface/components';

import { propsFactory, cssFactory } from 'form-designer-utils';
export default class FdComponent {
    constructor(key: string, componentInstance: Vue.ComponentInternalInstance | undefined) {
        console.log('componentInstance', componentInstance);
        this.$key = key;
        this.internalInstance = componentInstance;
        // @ts-ignore
        this.$$ref = componentInstance?.proxy;
        if (componentInstance && componentInstance.props) {
            this.$state = componentInstance.props.state as IComponentState;
        }
    }
    readonly $key?: string;
    readonly $state?: IComponentState;
    readonly $$ref?: Vue.ComponentPublicInstance;
    readonly internalInstance?: Vue.ComponentInternalInstance;
    // 获取组件属性
    public getProps = (name: string): any => {
        if (this.$$ref && this.$state) {
            return propsFactory.getPropsValue(this.$state, name) || '';
        } else {
            return '';
        }
    };
    // 设置组件属性
    public setProps = (name: string, value: any): void => {
        if (this.$$ref && this.$state) {
            propsFactory.setPropsValue(this.$state, name, value);
        }
    };
    // 获取组件属性
    public getCss = (name: EnumCssProerty): string => {
        if (this.$$ref && this.$state) {
            return cssFactory.getCssValue(this.$state, name) || '';
        } else {
            return '';
        }
    };
    // 设置组件属性
    public setCss = (name: EnumCssProerty, value: string): void => {
        if (this.$$ref && this.$state) {
            cssFactory.setCssValue(this.$state, name, value);
        }
    };
}
