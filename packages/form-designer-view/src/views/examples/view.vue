<template>
    <div class="cms-demo2">
        <template-renderer :json="jsonData"></template-renderer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import TemplateRenderer from 'form-designer-components/src/page.vue';
import jsonData from './demo1.data';

export default Vue.extend({
    components: {
        'template-renderer': TemplateRenderer,
    },
    computed: {
        ...mapState(['pages', 'selectedPage']),
    },
    mounted() {
        console.log(this.$route);
    },
    data: function (): any {
        return {
            jsonData,
        };
    },
});
</script>
