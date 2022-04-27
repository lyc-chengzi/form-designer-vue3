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
import { COMPONENTCOMMONPROPS } from '../../constant';
import useBase from '../../composables/base';
import useForm from '../../composables/form';
import { EnumComponentType } from 'form-designer-types/enum/components';

export default defineComponent({
    name: EnumComponentType.rate,
    props: COMPONENTCOMMONPROPS,
    setup(props) {
        const base = useBase(props as any);
        const form = useForm(props as any);
        return {
            ...base,
            ...form,
        };
    },
});
</script>
