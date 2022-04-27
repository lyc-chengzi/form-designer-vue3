import Vue from 'vue';
import antdV from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
export default function useAntdV(app: Vue.App) {
    app.use(antdV);
}
