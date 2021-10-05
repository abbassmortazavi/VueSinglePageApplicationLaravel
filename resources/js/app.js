require('./bootstrap');
window.Vue = require('vue').default;
import router from './routes';
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
Vue.use(VueSweetalert2);
window.Swal = Swal;

//create toast message
window.toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    /*didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }*/
});

function loggedIn(){
    let user = JSON.parse(localStorage.getItem('user'));
   // console.log(JSON.parse(user));
   if (user) {
      return user.access_token;
   }
    
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!loggedIn()) {
        next({
          path: '/login',
          //query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else if(to.matched.some(record => record.meta.guest)) {
        if (loggedIn()) {
            next({
              path: '/',
              //query: { redirect: to.fullPath }
            })
          } else {
            next()
          }
    }else{
        next() // make sure to always call next()!
    }
  });

const app = new Vue({
    el: '#app',
    router
});
