<template>
    <!--只渲染layout组件-->
    <div
        :class="{ 'fd-layout': true, 'designer-comp': c_isDesignMode && !_isPage }"
        :id="state.type === layoutType ? state.key : ''"
        :data-id="state.key"
        :data-type="state.type"
        :style="state.type === layoutType ? _Css : {}"
    >
        <template v-if="c_isDesignMode">
            <draggable
                class="layout-drag"
                :data-id="state.key"
                itemKey="key"
                group="componentDesigner"
                :list="state.list"
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
                        :parentId="state.key"
                        :id="element.key"
                        :data-id="element.key"
                        :data-type="element.type"
                        :pageData="pageData"
                        :pageMethod="pageMethod"
                    ></component>
                </template>
            </draggable>
        </template>
        <template v-else>
            <component
                v-for="child in state.list"
                :key="child.key"
                :is="child.type"
                :id="child.key"
                :state="child"
                :parentId="state.key"
                :data-type="child.type"
                :pageData="pageData"
                :pageMethod="pageMethod"
            ></component>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { COMPONENTCOMMONPROPS } from '../../constant';
import useBase from '../../composables/base';
import Draggable from 'vuedraggable';

import { IDesignerComponent } from 'form-designer-types/interface/designer';
// import DesignerBox from '@/components/designer/designerComponents/designerBox.vue';
import { EnumComponentType, EnumComponentGroup } from 'form-designer-types/enum/components';
import { commit_designer_dragAddComponent } from 'form-designer-vuex/src/store/modules/designer.module';

export default defineComponent({
    name: EnumComponentType.layout,
    components: {
        draggable: Draggable,
    },
    props: COMPONENTCOMMONPROPS,
    setup(props) {
        const base = useBase(props as any);
        return {
            ...base,
        };
    },
    data() {
        return {
            layoutType: EnumComponentType.layout,
            dragComponent: undefined as IDesignerComponent | undefined,
        };
    },
    computed: {
        _isPage(): boolean {
            return this.state.type === EnumComponentType.page;
        },
        _Css(): any {
            let combieCss: any = {};
            // 显示阴影
            if (this.c_Props.showShadow === true) {
                combieCss.boxShadow = '0 0 10px 0 #888888';
                combieCss.margin = '10px';
            }
            return {
                ...{},
                ...this.state.css,
                ...combieCss,
            };
        },
    },
    methods: {
        dragAddHandler() {
            const targetComponent = this.state;
            if (targetComponent) {
                const isLayoutType =
                    targetComponent.group === EnumComponentGroup.layout ||
                    targetComponent.type === EnumComponentType.row ||
                    targetComponent.type === EnumComponentType.col;
                if (isLayoutType) {
                    // @ts-ignore
                    this.$store.commit(`designer/${commit_designer_dragAddComponent}`, {
                        component: this.dragComponent,
                        parent: targetComponent,
                    });
                }
            }
        },
        dragChangeHandler(e: any) {
            if (e && e.added) {
                this.dragComponent = e.added.element;
            }
        },
    },
});
</script>
