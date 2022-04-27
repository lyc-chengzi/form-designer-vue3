import { IComponentState } from "form-designer-types/interface/components";

declare var $state: IComponentState;
declare var $event: Event;
declare class FdComponent {
    constructor(key: string, componentInstance: Vue | undefined);
    private readonly $key?: string;
    private readonly $state?: IComponentState;
    private readonly $$ref?: Vue;
    // 获取组件属性
    public getProps: (name: string) => any;
    // 设置组件属性
    public setProps: (name: string, value: any) => void;
    // 获取组件属性
    public getCss: (name: EnumCssProerty) => string;
    // 设置组件属性
    public setCss: (name: EnumCssProerty, value: string) => void;
}
declare var getComponent: (key: string) => FdComponent;