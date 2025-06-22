import './assets/main.css'
import { createRouter, createMemoryHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import App from './App.vue'

import Home from './Pages/Home.vue';
import Favorites from './Pages/Favorites.vue';

const app = createApp(App)

const routes = [
    { path: '/', name:'Home', component: Home },
    { path: '/favorites', name:'Favorites' , component: Favorites },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

app.use(router)

app.use(autoAnimatePlugin)

app.mount('#app')
