import { createApp as createVueApp } from 'vue';
import App from './Designer.vue';
import createRouter from '../router';
import createDesignerStore from '../store';
import { sync } from 'vuex-router-sync';
import usePlugin from '../plugins';
import componentRegister from 'form-designer-components/src/utils/componentRegister';
import '@/styles/index.less';
// 自定义组件样式
import 'form-designer-components/src/styles/index.less';
import { funcFactory } from 'form-designer-utils';

console.info('form designer version: ' + process.env.VUE_APP_VERSION);
export function createApp() {
    const app = createVueApp(App);
    const router = createRouter();
    const store = createDesignerStore();
    funcFactory.init(store);
    sync(store, router);
    app.use(store);
    app.use(router);
    usePlugin(app);
    const componentList = componentRegister(app);

    app.config.globalProperties.$default_componentList = componentList;

    console.log('app', app);
    return { app, router, store };
}
