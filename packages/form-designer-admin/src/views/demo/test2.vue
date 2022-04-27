<template>
    <div class="demo-component-test2" style="padding: 20px">
        <slot name="header" :content="headerSlot"></slot>
        <slot :content="defaultSlot"></slot>
        <slot name="content" :content="contentSlot"></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'demo-component-test2',
    data: () => {
        return {
            defaultSlot: {
                text: 'default Text',
            },
            headerSlot: {
                text: 'header Text',
            },
            contentSlot: {
                text: 'content Text',
            },
        };
    },
});
</script>
