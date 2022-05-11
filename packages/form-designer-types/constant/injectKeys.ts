import { InjectionKey, ComponentInternalInstance, ComponentPublicInstance } from 'vue';
import { EnumAppMode } from '../enum';
import { IFormField } from '../interface/components/form';

// 向页面注册组件
export const addComponent = Symbol() as InjectionKey<
    (key: string, componentInstance: ComponentInternalInstance) => void
>;
// 从页面中删除组件
export const removeComponent = Symbol() as InjectionKey<(key: string) => void>;
// 获取页面种的某个组件
export const getComponentByKey = Symbol() as InjectionKey<(key: string) => any>;
// 获取app模式
export const getAppMode = Symbol() as InjectionKey<() => EnumAppMode>;
// 获取当前页面的实例
export const getPageInstance = Symbol() as InjectionKey<() => ComponentPublicInstance | undefined>;

// 获取form的实例
type getFdFormRefType = () => ComponentInternalInstance | undefined;
export const getFdFormRef = Symbol() as InjectionKey<getFdFormRefType>;

// 获取form所有字段对象
type getFdFormFieldsType = () => IFormField[];
export const getFdFormFields = Symbol() as InjectionKey<getFdFormFieldsType>;

// 表单提交方法
type formSubmitedType = (success: boolean, message: string) => void;
export const formSubmited = Symbol() as InjectionKey<formSubmitedType>;
