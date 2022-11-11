import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import VueLatex from 'vatex';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router).mount('#app');
app.use(ElementPlus);
app.use(VueLatex);

// createApp(App).use(router).mount('#app');
