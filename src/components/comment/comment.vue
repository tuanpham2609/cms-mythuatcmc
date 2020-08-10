<template>
    <div class="tuanpd" id="app">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-flex pull-rigth">
                    <h6 class="m-0 font-weight-bold text-primary">Quản lí comment</h6>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Nội dung</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in comments" :key="index">
                                <td>{{item.name}}</td>
                                <td>{{item.email}}</td>
                                <td>{{item.content}}</td>
                                <td>{{item.created_at | moment("DD-MM-YYYY") }}</td>
                                <td>
                                    <button class="btn btn-danger delete" type="button"
                                        @click.stop.prevent="removeComment(item.id)">
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
                comments: [],
                list_post: {
                    current_page: 1,
                    last_page: 0,
                    total: 0,
                    per_page: 0
                },
            }
        },
        created() {
            this.getListComment();
        },
        methods: {
            getListComment() {
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.get(`${vm.$store.state.api}/admin/comment?page=${this.list_post.current_page}`)
                    .then(function (res) {
                        vm.$store.state.loading = false;
                        vm.comments = res.data.comments.data;
                        vm.list_post.current_page = res.data.comments.current_page;
                        vm.list_post.last_page = res.data.comments.last_page;
                        vm.list_post.total = res.data.comments.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            removeComment(item) {
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.delete(vm.$store.state.api+'/admin/comment/' + item)
                    .then(function (res) {
                        vm.getListComment();
                        vm.$store.state.loading = false;
                        vm.$helper.showNotification(res.data.message,'sentiment_satisfied_alt','success',300);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            },
        },
        watch: {
            'list_post.current_page': function (new_val) {
                this.getListComment();
            }
        }
    }
</script>