import { CreateElement, VNode } from 'vue';
import { IComponentState } from '../components';

export type factoryRenderFunc = (
    createElement: CreateElement,
    element?: IComponentState
) => VNode | undefined;
export type componentRenderFunc = (
    createElement: CreateElement,
    element: IComponentState,
    factory: factoryRenderFunc
) => VNode | undefined;
