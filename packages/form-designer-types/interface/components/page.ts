import { IComponentState } from './index';
import { EnumComponentType } from '../../enum/components';

export interface IPageState extends IComponentState<IPageProps> {
    type: EnumComponentType.page;
}

export interface IPageProps {
    empty?: string;
    pageData: Record<string, any>;
    pageMethods: Record<string, any>;
}
