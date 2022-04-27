import { createApp } from './Designer';

const { app, router } = createApp();
router.isReady().then(() => {
    app.mount('#app');
});
