import { EnumComponentType } from '../../enum/components';
import { IFormRules } from '../components/form';

export interface IPageForm {
    key: string;
    formId: string;
    column: IPageFormField[];
}

export interface IPageFormField {
    key: string; // 组件id
    type: EnumComponentType;
    label: string; // 显示名
    fieldName?: string; // 数据库字段名
    dataType: string;
    value?: any; // 数据库对应的字段值
    dataSize: number;
    relationFormId: string | null;
    relationColumnKey: string | null;
    rules: IFormRules[];
}
