import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store/store'
import './theme.css'

import VueSSE from 'vue-sse';

createApp(App).use(store).use(VueSSE).mount('#app')
