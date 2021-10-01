import Vue from 'vue';
import VueRouter from 'vue-router';

import Welcome from './components/Welcome';
import Create from './components/Create';
import Edit from './components/Edit';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component : Welcome,
        name: 'Welcome'
    },
    {
        path: '/create',
        component : Create,
        name: 'Create'
    },
    {
        path: '/edit/:id',
        component : Edit,
        name: 'Edit'
    },
    {
        path: '*',
        component : Welcome
    }
]

const router = new VueRouter({
    routes,
    mode:'history'
});


export default router;