import { EnumPropsValueType } from 'form-designer-types/enum/components';
import { IDesignerComponent, IPropsConfig } from 'form-designer-types/interface/designer';
import propsFactory from 'form-designer-utils/propsFactory';

export default function switchSelector(
    element: IDesignerComponent,
    props: IPropsConfig<{ k: any }>
) {
    return (
        <a-switch
            checked={propsFactory.getPropsValue(element, props.key)}
            onChange={(checked: boolean) => {
                propsFactory.setPropsValue(element, props.key, checked, EnumPropsValueType.boolean);
            }}
        />
    );
}
