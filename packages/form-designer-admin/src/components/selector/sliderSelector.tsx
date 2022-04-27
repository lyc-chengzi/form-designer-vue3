import { EnumPropsValueType } from 'form-designer-types/enum/components';
import { IDesignerComponent, IPropsConfig } from 'form-designer-types/interface/designer';
import propsFactory from 'form-designer-utils/propsFactory';

export default function sliderSelector(
    element: IDesignerComponent,
    props: IPropsConfig<{ k: any }>
) {
    return (
        <a-row>
            <a-col span={12}>
                <a-slider
                    value={propsFactory.getPropsValue(element, props.key)}
                    onChange={(value: string) =>
                        propsFactory.setPropsValue(
                            element,
                            props.key,
                            value,
                            EnumPropsValueType.number
                        )
                    }
                    min={props.sliderMin}
                    max={props.sliderMax}
                />
            </a-col>
            <a-col span={6}>
                <a-input-number
                    value={propsFactory.getPropsValue(element, props.key)}
                    onChange={(value: string) =>
                        propsFactory.setPropsValue(
                            element,
                            props.key,
                            value,
                            EnumPropsValueType.number
                        )
                    }
                    min={props.sliderMin}
                    max={props.sliderMax}
                    style="marginLeft: 5px"
                />
            </a-col>
        </a-row>
    );
}
