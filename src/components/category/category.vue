<template>
    <div class="tuanpd" id="app">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-flex pull-rigth">
                    <h6 class="m-0 font-weight-bold text-primary">Thể loại tin</h6>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#create">Thêm mới thể loại</button>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in categories" :key="index">
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.created_at | moment("DD-MM-YYYY") }}</td>
                                <td>
                                    <button class="btn btn-primary edit" data-toggle="modal" data-target="#edit"
                                        type="button" @click.stop.prevent="editCate(item.id)">
                                        <i class="fas fa-edit"></i>
                                    </button>
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
                        <h5 class="modal-title" id="exampleModalLabel">Thêm mới thể loại</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row" style="margin: 5px">
                            <div class="col-lg-12">
                                <form role="form">
                                    <fieldset class="form-group">
                                        <label>Tên thể loại:</label>
                                        <input class="form-control" v-model.trim="$v.category.name.$model" placeholder="Nhập tên thể loại">
                                        <p class="validation" :class="{ 'validation-active': $v.category.name.$error }" v-if="!$v.category.name.required">
                                            Tên không được để trống
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
        <!-- modal edit -->
        <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Chỉnh sửa thể loại</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row" style="margin: 5px">
                            <div class="col-lg-12">
                                <form role="form">
                                    <fieldset class="form-group">
                                        <label>Tên thể loại:</label>
                                        <input class="form-control" placeholder="Nhập tên thể loại" v-model.trim="$v.category.name.$model" >
                                        <p class="validation" :class="{ 'validation-active': $v.category.name.$error }" v-if="!$v.category.name.required">
                                            Tên không được để trống
                                        </p>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click.stop.prevent="updateCate()" :disabled="$v.$invalid">Save</button>
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>

        </div>
        <!-- modal edit -->

    </div>
</template>
<script>
    import Paginate from '@/components/paginate';
    import { required, minLength } from 'vuelidate/lib/validators';

    export default {
        components: { Paginate },
        data() {
            return {
                category: {
                    name:'',
                    slug:'',
                    show: 0,
                },
                categories: [],
                list_post: {
                    current_page: 1,
                    last_page: 0,
                    total: 0,
                    per_page: 0
                },
            }
        },
        validations:{
            category: {
                name: {
                    required,
                }
            }
        },
        created() {
            this.getListCategory();
        },
        methods: {
            getListCategory() {
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.get(`${vm.$store.state.api}/admin/category?page=${this.list_post.current_page}`)
                    .then(function (res) {
                        vm.$store.state.loading = false;
                        vm.categories = res.data.categories.data;
                        vm.list_post.current_page = res.data.categories.current_page;
                        vm.list_post.last_page = res.data.categories.last_page;
                        vm.list_post.total = res.data.categories.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            addNew() {
                var vm = this;
                vm.$store.state.loading = true;
                vm.category.slug = vm.$helper.ChangeToSlug(this.category.name);
                vm.$http.post(`${vm.$store.state.api}/admin/category`, vm.category)
                    .then(function (res) {
                        vm.$helper.showNotification(res.data.message,'sentiment_satisfied_alt','success',300);
                        vm.$store.state.loading = false;
                        $('#create').modal('hide');
                        vm.getListCategory();
                        vm.category.name = '';
                        vm.category.slug = '';
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            editCate(item) {
                var vm = this;
                vm.$store.state.loading = true;
                this.$http.get(vm.$store.state.api+'/admin/category/' + item + '/edit')
                    .then(function (res) {
                        $('#edit').modal('show');
                        vm.category = res.data.data;
                        vm.$store.state.loading = false;
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            },
            updateCate() {
                var vm = this;
                vm.$store.state.loading = true;
                vm.category.slug = vm.$helper.ChangeToSlug(this.category.name);
                vm.$http.put(vm.$store.state.api+'/admin/category/' + vm.category.id, vm.category)
                    .then(function (res) {
                        vm.$store.state.loading = false;
                        vm.$helper.showNotification(res.data.messsage,'sentiment_satisfied_alt','success',300);
                        $('#edit').modal('hide');
                        vm.getListCategory();
                        vm.category = {};
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            },
            removeCate(item) {
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.delete(vm.$store.state.api+'/admin/category/' + item)
                    .then(function (res) {
                        vm.getListCategory();
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
                this.getListCategory();
            }
        }
    }
</script>