import { IComponentState, IBaseFormItemProps } from 'form-designer-types/interface/components';
import { EnumComponentType } from 'form-designer-types/enum/components';
export interface IRateState extends IComponentState<IRateState> {
    type: EnumComponentType.rate;
}

export interface IRateProps extends IBaseFormItemProps {
    value?: number;
    defaultValue?: number;
}
