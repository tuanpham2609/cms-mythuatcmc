<template>
    <div class="tuanpd" id="app">
        <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="d-flex pull-rigth">
            <h6 class="m-0 font-weight-bold text-primary">ảnh</h6>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in images" :key="index">
                    <td>{{index + 1}}</td>
                    <td>
                        <img :src="$store.state.api+'/img/'+item.img" class="img-fluid" width="100px">
                    </td>
                    <td>
                    <button class="btn btn-danger delete" type="button" @click.stop.prevent="removeImg(item.id)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="paginate">
                <paginate :current="list_post.current_page" v-model="list_post.current_page" :total="list_post.last_page">
                </paginate>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>
<script>
    import Paginate from '@/components/paginate';
    export default {
        components: { Paginate},
        data() {
        return {
            images:[],
            list_post: {
            current_page: 1,
            last_page: 0,
            total: 0,
            per_page: 0
            }
        }
        },
        created() {
        this.getListImg();
        },
        methods: {
        getListImg() {
            var vm = this;
            vm.$http.get(`${vm.$store.state.api}/admin/upload-img?page=${this.list_post.current_page}`)
            .then(function (res) {
                vm.images = res.data.images.data;
                vm.list_post.current_page = res.data.images.current_page;
                vm.list_post.last_page = res.data.images.last_page;
                vm.list_post.total = res.data.images.total;
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        removeImg(id){
            var vm = this;
            vm.$http.delete(`${vm.$store.state.api}/admin/upload-img/${id}`)
            .then(function (res) {
                console.log(res);
                vm.getListImg();
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        },
        watch: {
        'list_post.current_page': function (new_val) {
            this.getListImg();
        }
        }
    }
</script>