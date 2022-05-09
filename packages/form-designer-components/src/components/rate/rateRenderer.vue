<template>
    <a-rate class="fd-rate" v-bind="c_Props"></a-rate>
</template>

<style lang="less">
.fd-rate {
    position: relative;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { EnumComponentType } from 'form-designer-types/enum/components';

export default defineComponent({
    name: EnumComponentType.rate,
});
</script>

<script lang="ts" setup>
import { defineProps } from 'vue';
import useBase from '../../composables/base';
import useForm from '../../composables/form';
import { IComponentState } from 'form-designer-types/interface/components';
const props = defineProps<{
    state: IComponentState;
    parentId: string;
    pageData: Record<string, any>;
    pageMethod: Record<string, any>;
}>();
const { c_Props } = useBase(props);
useForm(props);
</script>
