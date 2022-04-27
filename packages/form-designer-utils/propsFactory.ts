import { IPropsRenderFactory } from 'form-designer-types/interface/designer';
import { EnumPropsSelector } from 'form-designer-types/enum/designer';
import { EnumPropsValueType } from 'form-designer-types/enum/components';

const PropsFactory: IPropsRenderFactory = {
    getPropsValue: (state, propertyName) => {
        if (state && state.props) {
            if (Object.prototype.hasOwnProperty.call(state.props, propertyName)) {
                return state.props[propertyName].value;
            } else {
                return undefined;
            }
        }
        return undefined;
    },
    setPropsValue: (state, propertyName, value, type = EnumPropsValueType.string) => {
        console.log(state, propertyName);
        if (state && propertyName) {
            if (state.props) {
                // @ts-ignore
                state.props[propertyName] = {
                    type,
                    value,
                };
            } else {
                // @ts-ignore
                state.props = {
                    [propertyName]: {
                        type,
                        value,
                    },
                };
            }
        }
    },
    // 数组数据，添加数据
    pushPropsValue: (state, propertyName, value) => {
        if (state) {
            if (state.props) {
                // 如果已经有数据，直接push
                if (Object.prototype.hasOwnProperty.call(state.props, propertyName)) {
                    // @ts-ignore
                    state.props[propertyName].value.push(value);
                } else {
                    // @ts-ignore
                    state.props[propertyName] = {
                        value: [value],
                        type: EnumPropsValueType.array,
                    };
                }
            } else {
                // @ts-ignore
                state.props = {
                    [propertyName]: {
                        value: [value],
                        selector: EnumPropsSelector.select,
                    },
                };
            }
        }
    },
    // 数组数据，删除数据
    removePropsValue(state, propertyName, index) {
        if (state) {
            const data = this.getPropsValue(state, propertyName) as any[] | undefined;
            if (data) {
                data.splice(index, 1);
            }
        }
    },
    formatProps(props, getExpression, getFunction) {
        if (!props) return {};
        const _props = props!;
        const newProps: any = {};
        for (const key in _props) {
            const prop = _props[key];
            // 处理绑定数据
            if (prop.type === EnumPropsValueType.expression) {
                newProps[key] = getExpression(prop.value);
            } else if (prop.type === EnumPropsValueType.function) {
                newProps[key] = getFunction(prop.value as any);
            } else {
                newProps[key] = prop.value;
            }
        }
        return {
            ...newProps,
        };
    },
};

export default PropsFactory;
