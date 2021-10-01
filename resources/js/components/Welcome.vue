<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <h1 class="text-center">Welcome Page</h1>
                <router-link to="/create" class="btn btn-info float-right">Create</router-link>
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
                            <td>operation</td>
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
            emploeeis : []
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
        }
    },
    mounted(){
        this.getAll();
    }
}
</script>