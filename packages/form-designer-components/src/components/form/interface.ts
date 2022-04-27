import { IComponentState } from 'form-designer-types/interface/components';
import { EnumComponentType } from 'form-designer-types/enum/components';
export interface IFormState extends IComponentState<IFormProps> {
    type: EnumComponentType.form;
}

export interface IFormProps {
    formId?: string;
    formContentId?: string;
    disable?: boolean;
    readonly?: boolean;
    name?: string;
    topTitle?: boolean;
}
