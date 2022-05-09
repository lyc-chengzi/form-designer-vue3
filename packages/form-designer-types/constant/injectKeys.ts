import { InjectionKey, ComponentInternalInstance } from 'vue';
import { IFormField } from '../interface/components/form';

// 获取form的实例
type getFdFormRefType = () => ComponentInternalInstance;
export const getFdFormRef = Symbol() as InjectionKey<getFdFormRefType>;

type getFdFormFieldsType = () => IFormField[];
export const getFdFormFields = Symbol() as InjectionKey<getFdFormFieldsType>;
