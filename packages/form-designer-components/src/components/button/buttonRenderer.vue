<template>
    <a-button
        class="fd-button"
        :id="props.state.key"
        v-bind="c_Props"
        :style="c_Css"
        @click="clickHandler"
        @mouseover.stop="mouseoverHandler"
    >
        {{ c_Props.text }}
    </a-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { EnumComponentType } from 'form-designer-types/enum/components';

export default defineComponent({
    name: EnumComponentType.button,
});
</script>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { EnumEventType } from 'form-designer-types/enum/components';
import { computed } from 'vue';
import useBase from '../../composables/base';
import { IComponentState } from 'form-designer-types/interface/components';

const props = defineProps<{
    state: IComponentState;
    parentId: string;
}>();

const { c_Props, c_Css, getEventHandlers } = useBase(props);

const clickHandler = computed(() => {
    return getEventHandlers(EnumEventType.click);
});
const mouseoverHandler = computed(() => {
    return getEventHandlers(EnumEventType.mouseOver);
});
</script>
