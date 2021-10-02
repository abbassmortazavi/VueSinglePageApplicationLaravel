<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Create New Record</div>
              
                        <div class="card-body">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" v-model="dataform.name" class="form-control" id="name">
                            </div>
                            <div class="form-group">
                                <label for="position">Position</label>
                                <input type="text" v-model="dataform.position" class="form-control" id="position">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" v-model="dataform.email" class="form-control" id="email">
                            </div>
                            <div class="form-group">
                                <button @click.prevent="updateData()" class="btn btn-light">Update</button>
                            </div>
                        </div>
                 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataform:{}
        }
    },
    methods:{
        getEmployee(){
            let id = this.$route.params.id;
            axios.get(`/api/v1/getEmployee/${id}`)
            .then((result) => {
                this.dataform = result.data;
                //this.$router.push('/');
            }).catch((err) => {
                console.log(err);
            });
        },
        updateData(){
            let id = this.$route.params.id;
            axios.post('/api/v1/update/' + id , this.dataform)
            .then((result) => {
                toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                });
                this.$router.push('/');
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    mounted(){
        this.getEmployee()
        //console.log();
    }
}
</script>