import { createApp } from 'vue'
import App from './App'
import router from '@/router/router'
import store from '@/store/store'
import Vuex from 'vuex'

const app = createApp(App);

app.use(Vuex);
app.use(router);
app.use(store);

app.mount('#app')