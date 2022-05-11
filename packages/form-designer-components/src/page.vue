<template>
    <div v-if="json" class="template-page" :id="json.key" :style="json.css" data-app>
        <template v-if="_isDesignMode">
            <fd-layout
                class="fd-page-layout"
                :state="json"
                parentId=""
                :pageData="pageData"
                :pageMethod="pageMethods"
            ></fd-layout>
        </template>
        <template v-else>
            <component
                :is="state.type"
                v-for="state in json.list"
                :key="state.key"
                :state="state"
                :parentId="json.key"
                :pageData="pageData"
                :pageMethod="pageMethods"
            ></component>
        </template>
    </div>
</template>

<style lang="less">
@import url('./styles/var/index.less');

@prefixName: ~'@{prefix-className}';
.@{prefixName}-renderer {
    position: relative;
}
</style>

<script lang="ts">
import Vue, { defineComponent, PropType, reactive, provide, getCurrentInstance } from 'vue';
import { EnumComponentGroup, EnumComponentType } from 'form-designer-types/enum/components';
import {
    addComponent,
    removeComponent,
    getAppMode,
    getComponentByKey,
    getPageInstance,
} from 'form-designer-types/constant/injectKeys';
import { EnumAppMode } from 'form-designer-types/enum';
import { IPageState } from 'form-designer-types/interface/components/page';
import FdComponent from './component';
import moment from 'moment';

export default defineComponent({
    name: EnumComponentType.page,
    props: {
        json: {
            required: false,
            type: Object as PropType<IPageState>,
        },
        appMode: {
            required: true,
            default: () => EnumAppMode.view,
        },
    },
    setup(props) {
        const instance = getCurrentInstance();
        // 当前页面所有组件的实例集合
        const components = reactive<Map<string, FdComponent>>(new Map());
        // 当前页面所有的页面级变量
        const pageData = reactive<Record<string, any>>({});
        const pageMethods = reactive<Record<string, any>>({});

        provide(getAppMode, () => {
            return props.appMode;
        });
        provide(addComponent, (key, componentInstance) => {
            components.set(key, new FdComponent(key, componentInstance));
        });
        provide(removeComponent, key => {
            components.delete(key);
        });
        provide(getComponentByKey, key => {
            return components.get(key);
        });
        provide(getPageInstance, () => {
            return instance?.proxy;
        });

        return {
            components,
            pageData,
            pageMethods,
        };
    },
    created() {
        this.pageData = this.json!.props!.pageData.value;
        const methods = this.json!.props!.pageMethods.value;
        for (let key in methods) {
            this.pageMethods[key] = new Function(methods[key]).bind(this);
        }
    },
    computed: {
        _isDesignMode(): boolean {
            return this.appMode === EnumAppMode.design;
        },
    },
    methods: {
        // 清空form组件的值
        resetFormFields() {
            this.components.forEach(component => {
                // 将form组件的value设置为空
                if (component.$state && component.$state.group === EnumComponentGroup.form) {
                    component.setProps('value', null);
                }
            });
        },
        // 根据给定的defaultData默认值，初始化表单数据
        initFormFields(defaultData: Record<string, any>) {
            this.components.forEach(component => {
                // 将form组件的value设置为空
                if (component.$state && component.$state.group === EnumComponentGroup.form) {
                    const value = defaultData[component.$key || ''] || null;
                    if (component.$state.type === EnumComponentType.datePicker) {
                        if (value) {
                            component.setProps('value', moment(value));
                        } else {
                            component.setProps('value', null);
                        }
                    } else {
                        component.setProps('value', value);
                    }
                }
            });
        },
    },
});
</script>
