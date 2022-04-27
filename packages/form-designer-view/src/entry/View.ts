import Vue from 'vue';
import App from './View.vue';
import createRouter from '../router';
import createStore from '../store';
import { sync } from 'vuex-router-sync';
import '@/styles/index.less';
import 'form-designer-components/src/styles/index.less';
import { funcFactory } from 'form-designer-utils';

export function createApp() {
    const router = createRouter();
    const store = createStore();
    funcFactory.init(store);
    sync(store, router);
    const app = Vue.createApp({
        router,
        store,
        render: (h: any) => h(App),
    });
    return { app, router, store };
}
