<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h1 class="text-center">Welcome Page - {{ currentUser.name }}</h1>
                <router-link to="/create" class="btn btn-info float-right">Create</router-link>
                <a @click="logoutUser" class="btn btn-outline-primary">Logout</a>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h1 class="text-center">Information</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>name</td>
                            <td>position</td>
                            <td>Email</td>
                            <td>Opration</td>
                        </tr>
                    </thead>  
                    <tbody>
                        <tr v-for="employee in emploeeis" :key="employee.id">
                            <td>{{ employee.id }}</td>
                            <td>{{ employee.name }}</td>
                            <td>{{ employee.position }}</td>
                            <td>{{ employee.email }}</td>
                            <td>
                                <a @click="deleteEmployee(employee.id)" class="btn btn-danger">Delete</a>
                                <router-link :to="{name: 'Edit' , params:{'id':employee.id}}" class="btn btn-info">Edit</router-link>
                            </td>
                        </tr>    
                    </tbody>  
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            emploeeis : [],
            // userId: localStorage.getItem('userId'),
            // token: localStorage.getItem('token'),
            user: JSON.parse(localStorage.getItem('user')),
            currentUser : {},
            expires_in: ''
        }
    },
    methods:{
        getAll(){
            axios.get('/api/v1/getAll')
            .then((result) => {
                console.log(result);
                this.emploeeis = result.data.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        deleteEmployee(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete('/api/v1/deleteEmployee/' + id)
                        .then((result) => {
                            this.getAll();
                            toast.fire({
                                icon: 'success',
                                title: 'Deleted in successfully'
                            });
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                });
            
        },
        logoutUser(){
            axios.post('/api/v1/logoutUser')
            .then((result) => {
               // console.log(result);
                // localStorage.removeItem('token');
                // localStorage.removeItem('userId');
                localStorage.removeItem('user');
                this.$router.push('/login');
            }).catch((err) => {
                console.log(err);
            });
        },
        checkUserExpire(){
           axios.post('/api/v1/checkUserExpire' , {expires_in: this.user.expires_in} )
            .then((result) => {
                console.log(result.data);
                if (result.data.expire == false) {
                    localStorage.removeItem('user');
                    this.$router.push('/login');
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    mounted(){
        this.getAll();
        this.checkUserExpire();
         axios.get('/api/user' , {headers: { Authorization: `Bearer ${this.user.access_token}`}})
            .then((result) => {
               // console.log(result);
                this.currentUser = result.data;
            }).catch((err) => {
                console.log(err);
            });
    }
}
</script>