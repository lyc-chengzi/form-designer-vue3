<template>
    <div id="app">
        <DesignerIndexView />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DesignerIndexView from '../views/index';
export default defineComponent({
    name: 'form-designer',
    components: {
        DesignerIndexView,
    },
    mounted() {
        this.$store.commit('designer/commit_designer_set_componentList', {
            list: this.$default_componentList,
        });
    },
});
</script>
<style lang="less">
html,
body {
    overflow: hidden;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
