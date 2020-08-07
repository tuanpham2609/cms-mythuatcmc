<template>
    <div class="tuanpd" id="app">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-flex pull-rigth">
                    <h6 class="m-0 font-weight-bold text-primary">Tin tức</h6>
                    <button class="btn btn-primary" @click="addNewPost()">Thêm mới tin tức</button>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên</th>
                                <th>Tên không dấu</th>
                                <th>Hình ảnh</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in posts" :key="index">
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.slug}}</td>
                                <td>
                                    <img :src="$store.state.api+'/img/'+item.image" class="img-fluid" width="100px">
                                </td>
                                <td>
                                    <button class="btn btn-primary edit" data-toggle="modal" data-target="#edit"
                                        type="button" @click.stop.prevent="editForm(item.id)">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn-danger delete" type="button"
                                        @click.stop.prevent="removeForm(item.id)">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="paginate">
                        <paginate :current="list_post.current_page" v-model="list_post.current_page"
                            :total="list_post.last_page">
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
        components: { Paginate },
        data() {
            return {
                posts: [],
                list_post: {
                    current_page: 1,
                    last_page: 0,
                    total: 0,
                    per_page: 0
                },
            }
        },
        created() {
            this.getListPost();
        },
        methods: {
            getListPost() {
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.get(`${vm.$store.state.api}/admin/post?page=${this.list_post.current_page}`)
                    .then(function (res) {
                        vm.posts = res.data.posts.data;
                        vm.list_post.current_page = res.data.posts.current_page;
                        vm.list_post.last_page = res.data.posts.last_page;
                        vm.list_post.total = res.data.posts.total;
                        vm.$store.state.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            editForm(item) {
                this.$router.push({ name: "EditPost", params: { id: item } });
            },
            removeForm(item) {
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.delete(vm.$store.state.api+'/admin/post/' + item)
                    .then(function (res) {
                        vm.getListPost();
                        vm.$store.state.loading = false;
                        vm.$helper.showNotification(res.data.message,'sentiment_satisfied_alt','success',300);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            },
            addNewPost(){
                this.$router.push({ name: "CreatePost" });
            }
        }
    }
</script>