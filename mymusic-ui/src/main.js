import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store/store'
import './theme.css'

createApp(App).use(store).mount('#app')
