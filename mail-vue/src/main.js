import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import { init } from '@/init/init.js';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'nprogress/nprogress.css';
import perm from "@/perm/perm.js";
import { initTheme } from '@/theme/index.js';
const pinia = createPinia().use(piniaPersistedState)
import i18n from "@/i18n/index.js";

// 主题要在挂载前落地，且早于 init() 的网络请求，避免组件读到未着色的变量
initTheme()

const app = createApp(App).use(pinia)
await init()
app.use(router).use(i18n).directive('perm',perm)
app.config.devtools = true;

app.mount('#app');
