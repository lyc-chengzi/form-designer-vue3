<template>
    <!--只渲染layout组件-->
    <div
        :class="{ 'fd-layout': true, 'designer-comp': c_isDesignMode && !_isPage }"
        :id="props.state.type === layoutType ? props.state.key : ''"
        :data-id="props.state.key"
        :data-type="props.state.type"
        :style="props.state.type === layoutType ? _Css : {}"
    >
        <template v-if="c_isDesignMode">
            <Draggable
                class="layout-drag"
                :data-id="props.state.key"
                itemKey="key"
                group="componentDesigner"
                :list="props.state.list"
                chosen-class="chosen"
                animation="300"
                @add="dragAddHandler"
                @change="dragChangeHandler"
            >
                <template #item="{ element }">
                    <component
                        class="designer-comp"
                        :key="element.key"
                        :is="element.type"
                        :state="element"
                        :parentId="props.state.key"
                        :id="element.key"
                        :data-id="element.key"
                        :data-type="element.type"
                        :pageData="props.pageData"
                        :pageMethod="props.pageMethod"
                    ></component>
                </template>
            </Draggable>
        </template>
        <template v-else>
            <component
                v-for="child in props.state.list"
                :key="child.key"
                :is="child.type"
                :id="child.key"
                :state="child"
                :parentId="props.state.key"
                :data-type="child.type"
                :pageData="props.pageData"
                :pageMethod="props.pageMethod"
            ></component>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EnumComponentType } from 'form-designer-types/enum/components';

export default defineComponent({
    name: EnumComponentType.layout,
});
</script>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import useBase from '../../composables/base';
import Draggable from 'vuedraggable';

import { IDesignerComponent } from 'form-designer-types/interface/designer';
import { EnumComponentGroup } from 'form-designer-types/enum/components';
import { commit_designer_dragAddComponent } from 'form-designer-vuex/src/store/modules/designer.module';
import { IComponentState } from 'form-designer-types/interface/components';

const props = defineProps<{
    state: IComponentState;
    parentId: string;
    pageData: Record<string, any>;
    pageMethod: Record<string, any>;
}>();
const store = useStore();

const { c_Props, c_isDesignMode } = useBase(props);
const layoutType = EnumComponentType.layout;
let dragComponent: IDesignerComponent | undefined = undefined;

const _isPage = computed(() => {
    return props.state.type === EnumComponentType.page;
});
const _Css = computed(() => {
    let combieCss: any = {};
    // 显示阴影
    if (c_Props.value.showShadow === true) {
        combieCss.boxShadow = '0 0 10px 0 #888888';
        combieCss.margin = '10px';
    }
    return {
        ...{},
        ...props.state.css,
        ...combieCss,
    };
});

const dragAddHandler = () => {
    const targetComponent = props.state;
    if (targetComponent) {
        const isLayoutType =
            targetComponent.group === EnumComponentGroup.layout ||
            targetComponent.type === EnumComponentType.row ||
            targetComponent.type === EnumComponentType.col;
        if (isLayoutType) {
            store.commit(`designer/${commit_designer_dragAddComponent}`, {
                component: dragComponent,
                parent: targetComponent,
            });
        }
    }
};
const dragChangeHandler = (e: any) => {
    if (e && e.added) {
        dragComponent = e.added.element;
    }
};
</script>
