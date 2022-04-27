<template>
    <a-modal
        :visible="visible"
        title="选择变量和方法"
        :width="800"
        :footer="null"
        @cancel="clickCancel"
    >
        <div class="params-modal">
            <div class="params-type">
                <ul>
                    <li @click="checkType('params' as any)">
                        <a-button :type="checkedType === 'params' ? 'primary' : 'link'">
                            页面变量
                        </a-button>
                    </li>
                    <li @click="checkType('function' as any)">
                        <a-button :type="checkedType === 'function' ? 'primary' : 'link'">
                            页面方法
                        </a-button>
                    </li>
                </ul>
            </div>
            <div class="params-list">
                <ul v-if="checkedType === 'params'">
                    <li v-for="item in paramsList" :key="item.name" @click="checkParam(item.name)">
                        <a-button :type="checkedParamName === item.name ? 'primary' : 'link'">
                            {{ item.name }}
                        </a-button>
                    </li>
                    <li>
                        <a-button type="link">添加变量</a-button>
                    </li>
                </ul>
                <ul v-else>
                    <li
                        v-for="item in functionsList"
                        :key="item.name"
                        @click="checkParam(item.name)"
                    >
                        <a-button :type="checkedParamName === item.name ? 'primary' : 'link'">
                            {{ item.name }}
                        </a-button>
                    </li>
                    <li>
                        <a-button type="link">添加变量</a-button>
                    </li>
                </ul>
            </div>
            <div class="p-value">
                <div id="fd_designer_paramsmodal_monaco"></div>
                <div id="fd_designer_paramsmodal_monaco_action">
                    <a-button type="link" @click="setParam">选择</a-button>
                    <a-button type="primary" @click="saveParamValue">保存</a-button>
                </div>
            </div>
        </div>
    </a-modal>
</template>
<style lang="less" scoped>
.params-modal {
    display: flex;
    flex-flow: row nowrap;
    height: 500px;
    justify-content: flex-start;
    align-items: flex-start;
    ul {
        margin: 0;
        padding: 0;
        li {
            list-style: none;
            height: 26px;
            line-height: 26px;
        }
    }
    .params-type {
        width: 100px;
        height: 100%;
        overflow: auto;
    }
    .params-list {
        flex: 1;
        height: 100%;
        overflow: auto;
    }
    .p-value {
        flex: 3;
        height: 100%;
        overflow: hidden;
    }
    #fd_designer_paramsmodal_monaco {
        width: 100%;
        height: 90%;
    }
    #fd_designer_paramsmodal_monaco_action {
        height: 10%;
        text-align: right;
        padding-top: 5px;
        padding-right: 20px;
    }
}
</style>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IDesignerComponent } from 'form-designer-types/interface/designer';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { mapGetters } from 'vuex';

enum EnumParamType {
    params = 'params',
    function = 'function',
}
export default defineComponent({
    name: 'params-modal',
    props: {
        element: {
            required: false,
            type: Object as PropType<IDesignerComponent>,
        },
        visible: {
            required: true,
            type: Boolean,
        },
    },
    mounted() {
        setTimeout(() => {
            //this.initMonaco();
        }, 10000);
    },
    computed: {
        ...mapGetters('designer', {
            selectedPage: 'selectedPage',
        }),
        paramsList(): any[] {
            let result = [];
            if (this.selectedPage) {
                const pageData = this.selectedPage.props?.pageData.value;
                for (let key in pageData) {
                    result.push({ name: key, value: pageData[key] });
                }
            }
            return result;
        },
        functionsList(): any[] {
            let result = [];
            if (this.selectedPage) {
                const methods = this.selectedPage.props?.pageMethods.value;
                for (let key in methods) {
                    result.push({ name: key, value: methods[key] });
                }
            }
            return result;
        },
    },
    emits: {
        ['update:visible'](visible: boolean): boolean {
            return visible;
        },
        paramChecked(paramInfo: { name: string; type: EnumParamType }) {
            return paramInfo;
        },
    },
    data() {
        return {
            // 标识用户选中的是 [变量] 还是 [方法]
            checkedType: EnumParamType.params,
            // 标识用户选中的 变量 或者 方法 名
            checkedParamName: '',
            monacoEditor: undefined as monaco.editor.IStandaloneCodeEditor | undefined,
        };
    },
    methods: {
        initMonaco() {
            /* 设置提示信息
            monaco.languages.typescript.typescriptDefaults.addExtraLib(
                `declare var $event: Event;
                declare class FdComponent {
                    constructor(key: string, componentInstance: Vue | undefined);
                    public readonly $key?: string;
                    private readonly $state?: IComponentState;
                    private readonly $$ref?: Vue;
                    public getProps: (name: string) => any;
                    public setProps: (name: string, value: any) => void;
                    public getCss: (name: EnumCssProerty) => string;
                    public setCss: (name: EnumCssProerty, value: string) => void;
                }
                declare var getComponent: (key: string) => FdComponent;`
            );
            */
            if (!this.monacoEditor) {
                this.monacoEditor = monaco.editor.create(
                    document.getElementById('fd_designer_paramsmodal_monaco')!,
                    {
                        language: 'typescript',
                        theme: 'vs',
                        value: '',
                        minimap: { enabled: true },
                    }
                );
            }
        },
        checkType(type: EnumParamType) {
            this.checkedType = type;
        },
        checkParam(name: string) {
            this.checkedParamName = name;
            if (!this.monacoEditor) return;
            if (this.checkedType === 'params') {
                const param = this.paramsList.find(p => p.name === name);
                this.monacoEditor.setValue(param!.value);
            } else if (this.checkedType === 'function') {
                const param = this.functionsList.find(f => f.name === name);
                this.monacoEditor.setValue(param!.value);
            }
        },
        saveParamValue() {
            if (this.selectedPage && this.monacoEditor) {
                const value = this.monacoEditor.getValue();
                if (this.checkedType === 'params') {
                    this.selectedPage.props!.pageData.value[this.checkedParamName] = value;
                } else if (this.checkedType === 'function') {
                    this.selectedPage.props!.pageMethods.value[this.checkedParamName] = value;
                }
            }
        },
        setParam() {
            this.$emit('paramCheck', {
                name: this.checkedParamName,
                type: this.checkedType,
            });
        },
        clickCancel() {
            this.$emit('visibleChanged', false);
        },
    },
});
</script>
