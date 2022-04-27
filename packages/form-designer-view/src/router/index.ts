import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        name: 'form_designer_view',
        path: '/formDesigner/view/form/:formId',
        meta: {
            className: 'form-renderer',
            label: '表单',
            title: '表单详情',
        },
        component: () => import(/* webpackChunkName: "form_view" */ '../views/examples/view.vue'),
    },
];

const createRouter = () => {
    const router = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: routes,
    });

    router.beforeEach((to, from, next) => {
        const className = to.meta?.className || '';
        if (className) {
            const html = document.querySelector('html');
            const body = document.querySelector('body');
            if (html) {
                html.setAttribute('class', className);
            }
            if (body) {
                body.setAttribute('class', className);
            }
        }
        next();
    });
    return router;
};

export default createRouter;
