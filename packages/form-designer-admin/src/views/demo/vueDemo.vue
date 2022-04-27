<template>
    <div class="demo-vue-page" style="padding: 20px">
        <Test1>
            <template #header="{ text }">
                <h3>Test 1 Header: {{ text }}</h3>
            </template>
            <template #default="{ text }">
                <h3>Test 1 default: {{ text }}</h3>
            </template>
            <template #content="{ text }">
                <h3>Test 1 content: {{ text }}</h3>
            </template>
        </Test1>
        <Test2>
            <template #header="{ content }">
                <h3>Test 2 Header: {{ content.text }}</h3>
            </template>
            <template #default="{ content }">
                <h3>Test 2 default: {{ content.text }}</h3>
            </template>
            <template #content="{ content }">
                <h3>Test 2 content: {{ content.text }}</h3>
            </template>
        </Test2>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Test1 from './test1';
import Test2 from './test2.vue';
export default defineComponent({
    name: 'vue-Demo',
    components: {
        Test1,
        Test2,
    },
});
</script>
