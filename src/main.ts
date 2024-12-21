import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './stores';

const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);

import '@/styles/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
