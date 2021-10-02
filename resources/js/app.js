require('./bootstrap');
window.Vue = require('vue').default;
import router from './routes';
import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

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
})

const app = new Vue({
    el: '#app',
    router
});
