<template>
    <div class="tuanpd" id="app">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-flex pull-rigth">
                    <h6 class="m-0 font-weight-bold text-primary">Tin tức</h6>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#create">Thêm mới tin tức</button>
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
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in posts" :key="index">
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.slug}}</td>
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
                        <h5 class="modal-title" id="exampleModalLabel">Thêm mới tin tức</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row" style="margin: 5px">
                            <div class="col-lg-12">
                                <form role="form">
                                    <fieldset class="form-group">
                                        <label>Tên tin tức:</label>
                                        <input class="form-control" v-model.trim="$v.post.name.$model" placeholder="Nhập tên tin tức">
                                        <p class="validation" :class="{ 'validation-active': $v.post.name.$error }" v-if="!$v.post.name.required">
                                            Tên không được trống.
                                        </p>
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <div class="form-group">
                                            <label for="">Thể loại tin tức:</label>
                                            <select class="form-control" v-model="post.idCategory">
                                                <option v-for="(item, index) in categories" :key="index" :value="item.id">
                                                    {{item.name}}
                                                </option>
                                            </select>
                                        </div>
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <div class="form-group">
                                            <label for="">Tin Nổi bật:</label>
                                            <select class="form-control" v-model="post.new_highlights">
                                                <option value="0">Không</option>
                                                <option value="1">Có</option>
                                            </select>
                                        </div>
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <div class="form-group">
                                            <label for="">Nội dung ngắn:</label>
                                            <textarea class="form-control" name="" id="" rows="3" v-model.trim="$v.post.short_content.$model"></textarea>
                                            <p class="validation" :class="{ 'validation-active': $v.post.short_content.$error }" v-if="!$v.post.short_content.required">
                                                Nội dung ngắn không được trống.
                                            </p>
                                        </div>
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <div class="form-group">
                                            <label for="">Nội dung: </label>
                                            <ckeditor v-on:dataCkeditor="getdataCkeditor"></ckeditor>
                                        </div>
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <div class="form-group">
                                            <label for="">Hình ảnh: </label>
                                            <uploadimg v-on:dataImages="getdataImage"></uploadimg>
                                        </div>
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
                                        <input class="form-control" placeholder="Nhập tên thể loại"
                                            v-model="post.name">
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click.stop.prevent="updateCate()">Save</button>
                        <button type="reset" class="btn btn-primary">Làm Lại</button>
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
    import Ckeditor from '@/components/ckeditor';
    import Uploadimg from '@/components/imageUploader';
    import Modal from '@/components/modal';

    export default {
        components: { Paginate,Modal,Ckeditor,Uploadimg },
        data() {
            return {
                post: {
                    idCategory: null,
                    name:'',
                    slug:'',
                    short_content: '',
                    description: '',
                    image: '',
                    new_highlights: 0,
                    view: 1,
                },
                posts: [],
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
            post: {
                name: {
                    required,
                },
                short_content: {
                    required,
                }
            }
        },
        created() {
            this.getListPost();
            this.getListCategory();
        },
        methods: {
            getListPost() {
                var vm = this;
                vm.$http.get(`/admin/post?page=${this.list_post.current_page}`)
                    .then(function (res) {
                        // vm.posts = res.data.posts.data;
                        // vm.list_post.current_page = res.data.posts.current_page;
                        // vm.list_post.last_page = res.data.posts.last_page;
                        // vm.list_post.total = res.data.posts.total;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            getListCategory(){
                var vm = this;
                vm.$http.get(`/admin/category-all`)
                    .then(function (res) {
                        vm.categories = res.data.categories;
                        vm.post.idCategory = vm.categories[0].id;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            addNew() {
                var vm = this;
                vm.post.slug = vm.$helper.ChangeToSlug(this.post.name);
                vm.$http.post('/admin/post', vm.post)
                    .then(function (res) {
                        vm.$helper.showNotification(res.data.message,'sentiment_satisfied_alt','success',300);
                        $('#create').modal('hide');
                        vm.getListPost();
                        vm.post = {};
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            editCate(item) {
                var vm = this;
                this.$http.get('admin/post/' + item + '/edit')
                    .then(function (res) {
                        $('#edit').modal('show');
                        vm.post = res.data.data;
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            },
            updateCate() {
                var vm = this;
                vm.post.slug = vm.$helper.ChangeToSlug(this.post.name);
                vm.$http.put('admin/post/' + vm.post.id, vm.post)
                    .then(function (res) {
                        vm.$helper.showNotification(res.data.message,'sentiment_satisfied_alt','success',300);
                        $('#edit').modal('hide');
                        vm.getListPost();
                        vm.post = {};
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            },
            removeCate(item) {
                var vm = this;
                vm.$http.delete('admin/post/' + item)
                    .then(function (res) {
                        vm.getListPost();
                        vm.$helper.showNotification(res.data.message,'sentiment_satisfied_alt','success',300);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            },
            getdataCkeditor(item){
                this.post.description = item;
            },
            getdataImage(item){
                console.log(item, 'hihi')
            }
        },
        watch: {
            'list_post.current_page': function (new_val) {
                this.getListPost();
            }
        }
    }
</script>