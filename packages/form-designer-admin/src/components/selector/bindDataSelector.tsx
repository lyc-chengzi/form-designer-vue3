import { EnumPropsValueType } from 'form-designer-types/enum/components';
import { IDesignerComponent, IPropsConfig } from 'form-designer-types/interface/designer';
import propsFactory from 'form-designer-utils/propsFactory';

export default function bindDataSelector(
    element: IDesignerComponent,
    props: IPropsConfig<{ k: any }>,
    other: {
        showParamsModal: (pmPropKey: string, pmPropValueType: EnumPropsValueType) => void;
    }
) {
    return (
        <div>
            <a-input
                prefix="{{"
                suffix="}}"
                value={propsFactory.getPropsValue(element, props.key)}
                onChange={(e: any) => {
                    propsFactory.setPropsValue(
                        element,
                        props.key,
                        e.target.value,
                        EnumPropsValueType.expression
                    );
                }}
                onPressEnter={() => {
                    other.showParamsModal(props.key, EnumPropsValueType.expression);
                }}
            ></a-input>
        </div>
    );
}
