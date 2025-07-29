import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';



import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

import router from './router';

import { envUrls, evnUrlKey, routePathKey } from "@/common/Contant";

localStorage.setItem(evnUrlKey, envUrls.TEST)
localStorage.setItem(routePathKey, '/home')

const app = createApp(App);

app.use(ElementPlus, { locale });

app.use(hljsVuePlugin)

app.use(router);

app.mount('#app');
