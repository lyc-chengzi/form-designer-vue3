import { IComponentState } from 'form-designer-types/interface/components';
import { EnumComponentType } from 'form-designer-types/enum/components';
export interface IButtonState extends IComponentState<IButtonProps> {
    type: EnumComponentType.button;
}

export interface IButtonProps {
    text?: string;
    disabled?: boolean;
    ghost?: boolean;
    htmlType?: 'button' | 'submit';
    icon?: string;
    loading?: boolean | { delay: number };
    shape?: 'circle' | 'round';
    type?: 'primary' | 'dashed' | 'danger' | 'link';
    scheme?: Record<string, string>;
}
