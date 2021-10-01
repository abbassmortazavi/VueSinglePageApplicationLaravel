import Vue from 'vue';
import VueRouter from 'vue-router';

import Welcome from './components/Welcome';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component : Welcome,
        name: 'Welcome'
    }
]

const router = new VueRouter({
    routes,
    mode:'history'
});


export default router;