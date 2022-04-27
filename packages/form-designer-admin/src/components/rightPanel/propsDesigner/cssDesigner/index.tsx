import { defineComponent, PropType } from 'vue';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import './index.less';
import { IDesignerComponent } from 'form-designer-types/interface/designer';
import { EnumCssProerty } from 'form-designer-types/enum/designer';
import { cssFactory } from 'form-designer-utils';
import CssBoxDesigner from '../cssBoxDesigner.vue';
import CssWidthSelector from '../../../selector/widthSelector';
import CssColorSelector from '../../../selector/colorSelector';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: 'designer-css-panel',
    props: {
        element: {
            type: Object as PropType<IDesignerComponent>,
            required: false,
        },
    },
    data() {
        return {
            showMonaco: false,
            monacoEditor: undefined as monaco.editor.IStandaloneCodeEditor | undefined,
        };
    },
    computed: {
        ...mapGetters('designer', {
            componentList: 'componentList',
        }),
    },
    methods: {
        initMonaco() {
            if (!this.monacoEditor) {
                this.monacoEditor = monaco.editor.create(
                    document.getElementById('fd_css_designer_monaco')!,
                    {
                        language: 'css',
                        value:
                            cssFactory.getCssValue(this.element!, EnumCssProerty.styleText) || '',
                        minimap: { enabled: true },
                    }
                );
            } else {
                this.monacoEditor.setValue(
                    cssFactory.getCssValue(this.element!, EnumCssProerty.styleText) || ''
                );
            }
        },
        openMonaco() {
            this.showMonaco = true;
            setTimeout(() => {
                this.initMonaco();
            }, 200);
        },
        closeMonaco() {
            this.showMonaco = false;
        },
        saveMonaco() {
            this.showMonaco = false;
            if (this.monacoEditor) {
                const styleText = this.monacoEditor.getValue();
                cssFactory.setCssValue(this.element!, EnumCssProerty.styleText, styleText);
            }
        },
        renderCssList() {
            if (!this.element) return null;
            const componentList = this.componentList as IDesignerComponent[];
            const comp = componentList.find(c => c.type === this.element!.type);
            if (this.element && comp && comp.cssConfigs) {
                return comp.cssConfigs.map(c => {
                    if (c === EnumCssProerty.position) {
                        return (
                            <div class="item">
                                <div class="label">定位</div>
                                <div class="value">
                                    <a-select
                                        value={cssFactory.getCssValue(
                                            this.element!,
                                            EnumCssProerty.position
                                        )}
                                        onChange={(value: string) =>
                                            cssFactory.setCssValue(
                                                this.element!,
                                                EnumCssProerty.position,
                                                value
                                            )
                                        }
                                    >
                                        <a-select-option value="">请选择</a-select-option>
                                        <a-select-option value="relative">相对定位</a-select-option>
                                        <a-select-option value="absolute">绝对定位</a-select-option>
                                        <a-select-option value="fixed">fixed</a-select-option>
                                    </a-select>
                                </div>
                            </div>
                        );
                    } else if (c === EnumCssProerty.textAlign) {
                        return (
                            <div class="item">
                                <div class="label">内容对齐</div>
                                <div class="value">
                                    <a-select
                                        value={cssFactory.getCssValue(
                                            this.element!,
                                            EnumCssProerty.textAlign
                                        )}
                                        onChange={(value: string) =>
                                            cssFactory.setCssValue(
                                                this.element!,
                                                EnumCssProerty.textAlign,
                                                value
                                            )
                                        }
                                    >
                                        <a-select-option value="">请选择</a-select-option>
                                        <a-select-option value="left">左对齐</a-select-option>
                                        <a-select-option value="center">居中</a-select-option>
                                        <a-select-option value="right">右对齐</a-select-option>
                                    </a-select>
                                </div>
                            </div>
                        );
                    } else if (c === EnumCssProerty.display) {
                        return (
                            <div class="item">
                                <div class="label">显示类型</div>
                                <div class="value">
                                    <a-select
                                        value={cssFactory.getCssValue(
                                            this.element!,
                                            EnumCssProerty.display
                                        )}
                                        onChange={(value: string) =>
                                            cssFactory.setCssValue(
                                                this.element!,
                                                EnumCssProerty.display,
                                                value
                                            )
                                        }
                                    >
                                        <a-select-option value="">请选择</a-select-option>
                                        <a-select-option value="flex">flex</a-select-option>
                                        <a-select-option value="block">块元素</a-select-option>
                                        <a-select-option value="inline-block">
                                            行内块元素
                                        </a-select-option>
                                        <a-select-option value="inline">行内元素</a-select-option>
                                    </a-select>
                                </div>
                            </div>
                        );
                    } else if (c === EnumCssProerty.width) {
                        return (
                            <div class="item">
                                <div class="label">宽度</div>
                                <div class="value">
                                    {/*// @ts-ignore */}
                                    <CssWidthSelector
                                        element={this.element}
                                        propertyName={EnumCssProerty.width}
                                    />
                                </div>
                            </div>
                        );
                    } else if (c === EnumCssProerty.height) {
                        return (
                            <div class="item">
                                <div class="label">高度</div>
                                <div class="value">
                                    {/*// @ts-ignore */}
                                    <CssWidthSelector
                                        element={this.element}
                                        propertyName={EnumCssProerty.height}
                                    />
                                </div>
                            </div>
                        );
                    } else if (c === EnumCssProerty.backgroundColor) {
                        return (
                            <div class="item">
                                <div class="label">背景色</div>
                                <div class="value">
                                    {/*// @ts-ignore */}
                                    <CssColorSelector
                                        element={this.element}
                                        propertyName={EnumCssProerty.backgroundColor}
                                    />
                                </div>
                            </div>
                        );
                    }
                });
            }
        },
    },
    render() {
        return (
            <div class="designer-css-panel">
                <div class="section">
                    <div class="item">
                        <div class="label">边距</div>
                        <div class="value">
                            {/*// @ts-ignore */}
                            <CssBoxDesigner element={this.element} />
                        </div>
                    </div>
                    {this.renderCssList()}
                    <div class="item">
                        <div class="label">css代码</div>
                        <div class="value">
                            <a-button onClick={this.openMonaco}>编辑</a-button>
                        </div>
                    </div>
                </div>
                <div id="fd_css_monaco_box" style={{ display: this.showMonaco ? 'block' : 'none' }}>
                    <div class="box-buttons">
                        <a-button type="link" onClick={this.closeMonaco}>
                            关闭
                        </a-button>
                        <a-button type="primary" onClick={this.saveMonaco}>
                            确定
                        </a-button>
                    </div>
                    <div id="fd_css_designer_monaco"></div>
                </div>
            </div>
        );
    },
});
