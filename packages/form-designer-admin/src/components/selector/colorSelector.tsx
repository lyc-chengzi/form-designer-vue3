import { VNode, defineComponent, PropType } from 'vue';
import { Photoshop } from 'vue-color';
import { IDesignerComponent } from 'form-designer-types/interface/designer';
import { EnumCssProerty } from 'form-designer-types/enum/designer';
import { cssFactory } from 'form-designer-utils';

export default defineComponent({
    name: 'css-color-selector',
    props: {
        element: {
            required: false,
            type: Object as PropType<IDesignerComponent>,
        },
        propertyName: {
            required: true,
            type: String as PropType<EnumCssProerty>,
        },
    },
    data() {
        return {
            value: '',
        };
    },
    computed: {
        _value: {
            get(): string {
                const value = cssFactory.getCssValue(this.element!, this.propertyName);
                return value || '';
            },
            set(value: any): void {
                this.value = value.hex;
                if (this.value) {
                    cssFactory.setCssValue(this.element!, this.propertyName, this.value);
                } else {
                    cssFactory.setCssValue(this.element!, this.propertyName, undefined);
                }
            },
        },
    },
    render(): VNode {
        return (
            <div class="css-color-selector">
                <a-popover placement="left" trigger="click">
                    {/*// @ts-ignore */}
                    <div slot="content" style={{ width: 200, height: 200 }}>
                        <Photoshop v-model={this._value} onCancel={() => (this._value = '')} />
                    </div>
                    <a-button
                        class="button-show"
                        style={{ backgroundColor: this._value, width: '80%' }}
                    >
                        &nbsp;
                    </a-button>
                </a-popover>
            </div>
        );
    },
});
