import { EnumPropsValueType } from 'form-designer-types/enum/components';
import { IDesignerComponent, IPropsConfig } from 'form-designer-types/interface/designer';
import propsFactory from 'form-designer-utils/propsFactory';

export default function inputSelector(
    element: IDesignerComponent,
    props: IPropsConfig<{ k: any }>
) {
    return (
        <a-input
            value={propsFactory.getPropsValue(element, props.key)}
            onChange={(e: any) => {
                propsFactory.setPropsValue(
                    element,
                    props.key,
                    e.target.value,
                    EnumPropsValueType.string
                );
            }}
        ></a-input>
    );
}
