import { EnumPropsValueType } from 'form-designer-types/enum/components';
import { IDesignerComponent, IPropsConfig } from 'form-designer-types/interface/designer';
import propsFactory from 'form-designer-utils/propsFactory';

export default function selectSelector(
    element: IDesignerComponent,
    props: IPropsConfig<{ k: any }>
) {
    return (
        <a-select
            value={propsFactory.getPropsValue(element, props.key)}
            onChange={(value: string) =>
                propsFactory.setPropsValue(element, props.key, value, EnumPropsValueType.string)
            }
        >
            {props.selectOptions &&
                props.selectOptions.map(option => (
                    <a-select-option value={option.key}>{option.label}</a-select-option>
                ))}
        </a-select>
    );
}
