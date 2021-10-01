<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Create New Record</div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" v-model="dataform.name" class="form-control" name="name" id="name">
                        </div>
                        <div class="form-group">
                            <label for="position">Position</label>
                            <input type="text" v-model="dataform.position" class="form-control" name="position" id="position">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" v-model="dataform.email" class="form-control" name="email" id="email">
                        </div>
                        <div class="form-group">
                            <button  @click="createData()" class="btn btn-light">Create</button>
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
            dataform:{
                name: '',
                position: '',
                email: ''
            }
        }
    },
    methods:{
        createData(){
            axios.post('/api/v1/create' , this.dataform)
            .then((result) => {
                console.log(result);
                this.$router.push('/');
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>