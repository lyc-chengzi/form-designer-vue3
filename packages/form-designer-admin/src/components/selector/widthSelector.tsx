import { defineComponent, PropType } from 'vue';
import { IDesignerComponent } from 'form-designer-types/interface/designer';
import { EnumCssProerty } from 'form-designer-types/enum/designer';
import { cssFactory } from 'form-designer-utils';

export default defineComponent({
    name: 'css-width-selector',
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
            valueTypeList: [
                { key: 'px', label: 'px' },
                { key: '%', label: '%' },
                { key: 'em', label: 'em' },
                { key: 'rem', label: 'rem' },
            ],
            value: '',
            valueUnit: 'px',
        };
    },
    computed: {
        _value: {
            get(): string {
                const value = cssFactory.getCssValue(this.element!, this.propertyName);
                if (value) {
                    return value.replace(this.valueUnit, '');
                } else {
                    return '';
                }
            },
            set(value: string): void {
                this.value = value;
                if (value) {
                    cssFactory.setCssValue(
                        this.element!,
                        this.propertyName,
                        value + this.valueUnit
                    );
                } else {
                    cssFactory.setCssValue(this.element!, this.propertyName, undefined);
                }
            },
        },
    },
    watch: {
        element: {
            handler(newElement, oldElement) {
                if (newElement && newElement !== oldElement) {
                    const css = newElement.css;
                    if (css && css[this.propertyName]) {
                        const __value = css[this.propertyName];
                        if (__value.indexOf('px') > -1) {
                            this.valueUnit = 'px';
                            this.value = this._value;
                        } else if (__value.indexOf('%') > -1) {
                            this.valueUnit = '%';
                            this.value = this._value;
                        } else if (__value.indexOf('em') > -1) {
                            this.valueUnit = 'em';
                            this.value = this._value;
                        } else if (__value.indexOf('rem') > -1) {
                            this.valueUnit = 'rem';
                            this.value = this._value;
                        }
                    }
                }
            },
            immediate: true,
        },
    },
    methods: {
        valueUnitChange(type: string) {
            this.valueUnit = type;
            if (this.value) {
                this._value = this.value;
            }
        },
    },
    render() {
        return (
            <a-input-group compact>
                <a-input v-model:value={this._value} style={{ width: '100px' }}></a-input>
                <a-select
                    value={this.valueUnit}
                    onChange={this.valueUnitChange}
                    style={{ width: '66px' }}
                >
                    {this.valueTypeList.map(type => (
                        <a-select-option value={type.key}>{type.label}</a-select-option>
                    ))}
                </a-select>
            </a-input-group>
        );
    },
});
