import Vue from 'vue';
import VueRouter from 'vue-router';

import Welcome from './components/Welcome';
import Create from './components/Create';
import Edit from './components/Edit';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component : Welcome,
        name: 'Welcome',
        meta:{
            requiresAuth: true
        } 
    },
    {
        path: '/create',
        component : Create,
        name: 'Create',
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/edit/:id',
        component : Edit,
        name: 'Edit',
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '*',
        component : Welcome
    },
    {
        path: '/login',
        component: Login,
        name: 'Login',
        meta:{
            guest: true
        }
    },
    {
        path: '/register',
        component: Register,
        name: 'Register',
        meta:{
            guest: true
        }
    }
]

const router = new VueRouter({
    routes,
    mode:'history'
});


export default router;