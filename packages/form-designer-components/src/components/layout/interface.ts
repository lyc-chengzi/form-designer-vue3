import { IComponentState } from 'form-designer-types/interface/components';
import { EnumComponentType } from 'form-designer-types/enum/components';
export interface ILayoutState extends IComponentState<ILayoutProps> {
    type: EnumComponentType.layout;
}

export interface ILayoutProps {
    showShadow?: boolean;
}
