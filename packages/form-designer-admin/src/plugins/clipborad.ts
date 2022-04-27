import Vue from 'vue';
import copy from 'copy-to-clipboard';
export default function useClipboard(app: Vue.App) {
    app.config.globalProperties.$clipboard = function (text: string) {
        console.log('copy text: ', text);
        copy(text);
    };
}
