import { VNode } from 'vue';
import { IDesignerComponent, IPropsConfig } from 'form-designer-types/interface/designer';
import propsFactory from 'form-designer-utils/propsFactory';
import { DeleteFilled } from '@ant-design/icons-vue';

// 数组数据选择器
function arrayDataPropsSelector(
    element: IDesignerComponent,
    props: IPropsConfig<{ k: string }>
): VNode[] | undefined {
    const data: any = propsFactory.getPropsValue(element, props.key);
    if (data && data instanceof Array && data.length) {
        return data.map((d: any, index) => {
            return (
                <li class="data-item" key={index}>
                    <a-input
                        value={d.key}
                        placeholder="key"
                        onChange={(e: any) => (d.key = e.target.value)}
                    ></a-input>
                    <a-input
                        value={d.label}
                        placeholder="label"
                        onChange={(e: any) => (d.label = e.target.value)}
                    ></a-input>
                    <DeleteFilled
                        onClick={() => propsFactory.removePropsValue(element, props.key, index)}
                    />
                </li>
            );
        });
    } else {
        return [];
    }
}

export default function arrayDataSelector(
    element: IDesignerComponent,
    props: IPropsConfig<{ k: any }>
) {
    return (
        <div class="selector-array-data">
            <ul>{arrayDataPropsSelector(element, props)}</ul>
            <a-button
                type="primary"
                onClick={() => {
                    const data = (propsFactory.getPropsValue(element, props.key) || []) as any[];
                    propsFactory.pushPropsValue(element, props.key, {
                        key: `item${data.length}`,
                        label: `item${data.length}`,
                    });
                }}
            >
                添加
            </a-button>
        </div>
    );
}
