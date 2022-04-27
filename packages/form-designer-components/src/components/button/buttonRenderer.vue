<template>
    <a-button
        class="fd-button"
        :id="state.key"
        v-bind="c_Props"
        :style="c_Css"
        @click="clickHandler"
        @mouseover.stop="mouseoverHandler"
    >
        {{ c_Props.text }}
    </a-button>
</template>

<script lang="tsx">
import { defineComponent } from 'vue';
import { COMPONENTCOMMONPROPS } from '../../constant';
import useBase from '../../composables/base';
import { EnumComponentType, EnumEventType } from 'form-designer-types/enum/components';

export default defineComponent({
    name: EnumComponentType.button,
    props: COMPONENTCOMMONPROPS,
    setup(props) {
        const base = useBase(props as any);
        return {
            ...base,
        };
    },
    computed: {
        // 创建click事件
        clickHandler(): any {
            return this.getEventHandlers(EnumEventType.click);
        },
        mouseoverHandler(): any {
            return this.getEventHandlers(EnumEventType.mouseOver);
        },
    },
});
</script>
