<template>
    <div class="tuanpd" id="app">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-flex pull-rigth">
                    <h6 class="m-0 font-weight-bold text-primary">User</h6>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#create">Thêm mới user</button>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in users" :key="index">
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.email}}</td>
                                <td>
                                    <button class="btn btn-danger delete" type="button"
                                        @click.stop.prevent="removeCate(item.id)">
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
        <!-- modal create -->
        <div class="modal fade" id="create" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Thêm mới user</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row" style="margin: 5px">
                            <div class="col-lg-12">
                                <form role="form">
                                    <fieldset class="form-group">
                                        <label>Tên user:</label>
                                        <input class="form-control" v-model.trim="$v.user.name.$model" placeholder="Nhập tên thể loại">
                                        <p class="validation" :class="{ 'validation-active': $v.user.name.$error }" v-if="!$v.user.name.required">
                                            Tên không được bỏ trống
                                        </p>
                                        <p class="validation" :class="{ 'validation-active': $v.user.name.$error }" v-if="!$v.user.name.minLength">
                                            Tên phải lớn hơn 4 kí tự
                                        </p>
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <label>Email user:</label>
                                        <input class="form-control" v-model.trim="$v.user.email.$model" placeholder="Nhập tên thể loại">
                                        <p class="validation" :class="{ 'validation-active': $v.user.email.$error }" v-if="!$v.user.email.required">
                                            Email không được bỏ trống
                                        </p>
                                        <p class="validation" :class="{ 'validation-active': $v.user.email.$error }" v-if="!$v.user.email.email">
                                            Email phải nhập đúng
                                        </p>
                                        <p class="validation" :class="{ 'validation-active': $v.user.email.$error }" v-if="!$v.user.email.minLength">
                                            Tên phải lớn hơn 4 kí tự
                                        </p>
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <label>Password user:</label>
                                        <input class="form-control" v-model.trim="$v.user.password.$model" placeholder="Nhập tên thể loại" type="password">
                                        <p class="validation" :class="{ 'validation-active': $v.user.password.$error }" v-if="!$v.user.password.required">
                                            Password không được bỏ trống
                                        </p>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click.stop.prevent="addNew()" :disabled="$v.$invalid">
                            Save
                        </button>
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal create -->
    </div>
</template>
<script>
    import Paginate from '@/components/paginate';
    import { required, minLength, email} from 'vuelidate/lib/validators';

    export default {
        components: { Paginate },
        data() {
            return {
                user: {
                    name:'',
                    email:'',
                    password: '',
                },
                users: [],
                list_post: {
                    current_page: 1,
                    last_page: 0,
                    total: 0,
                    per_page: 0
                },
            }
        },
        validations:{
            user: {
                name: {
                    required,minLength:minLength(4)
                },
                email: {
                    required,email,minLength:minLength(4)
                },
                password: {
                    required,
                },
            }
        },
        created() {
            this.getListUser();
        },
        methods: {
            getListUser() {
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.get(`${vm.$store.state.api}/admin/user?page=${this.list_post.current_page}`)
                    .then(function (res) {
                        vm.users = res.data.users.data;
                        vm.list_post.current_page = res.data.users.current_page;
                        vm.list_post.last_page = res.data.users.last_page;
                        vm.list_post.total = res.data.users.total;
                        vm.$store.state.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            addNew() {
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.post(`${vm.$store.state.api}/admin/user`, vm.user)
                    .then(function (res) {
                        if(res.data.error){
                            vm.$helper.showNotification('Thông tin trên đã tồn tại','sentiment_satisfied_alt','rose',300);
                            vm.$store.state.loading = false;
                        } else {
                            vm.$helper.showNotification(res.data.message,'sentiment_satisfied_alt','success',300);
                            $('#create').modal('hide');
                            vm.getListUser();
                            vm.user = {};
                            vm.$store.state.loading = false;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            removeCate(item) {
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.delete(vm.$store.state.api+'/admin/user/' + item)
                    .then(function (res) {
                        vm.getListUser();
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
                this.getListUser();
            }
        }
    }
</script>