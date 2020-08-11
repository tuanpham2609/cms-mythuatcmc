<template>
    <div class="tuanpd" id="app">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-flex pull-rigth">
                    <h6 class="m-0 font-weight-bold text-primary">Thêm mới tin tức</h6>
                    <div>
                        <button class="btn btn-default mr-2" type="button" @click="Back()">
                            Quay lại
                        </button>
                        <button class="btn btn-primary" @click.stop.prevent="addNew()" :disabled="$v.$invalid">
                            Tạo mới
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
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
                                    <select class="form-control" v-model="post.idCategory" @change="SortType($event)">
                                        <option :value="undefined">Choose Option</option>
                                        <option v-for="(item, index) in categories" :key="index" :value="item.id" :name="item.slug">
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
                                    <ckeditor v-on:dataCkeditor="getdataCkeditor" v-model.trim="$v.post.description.$model"></ckeditor>
                                    <p class="validation" :class="{ 'validation-active': $v.post.description.$error }" v-if="!$v.post.description.required">
                                        Nội dung không được trống.
                                    </p>
                                </div>
                            </fieldset>
                            <fieldset class="form-group">
                                <div class="form-group">
                                    <label for="">Hình ảnh: </label>
                                    <uploadimg v-on:dataImages="getdataImage" v-model.trim="$v.post.description.$model"></uploadimg>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { required } from 'vuelidate/lib/validators';
    import Ckeditor from '@/components/ckeditor';
    import Uploadimg from '@/components/imageUploader';
    import Modal from '@/components/modal';

    export default {
        components: { Modal,Ckeditor,Uploadimg },
        data() {
            return {
                post: {
                    idCategory: undefined,
                    slugCategory: undefined,
                    name:'',
                    slug:'',
                    short_content: '',
                    description: '',
                    image: '',
                    new_highlights: 0,
                    view: 1,
                },
                categories: [],
            }
        },
        validations:{
            post: {
                name: {
                    required,
                },
                short_content: {
                    required,
                },
                description: {
                    required,
                },
                image: {
                    required,
                }
            }
        },
        created() {
            this.getListCategory();
        },
        methods: {
            getListCategory(){
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.get(`${vm.$store.state.api}/admin/category-all`)
                    .then(function (res) {
                        vm.categories = res.data.categories;
                        vm.$store.state.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            addNew() {
                var vm = this;
                vm.$store.state.loading = true;
                vm.post.slug = vm.$helper.ChangeToSlug(this.post.name);
                vm.$http.post(`${vm.$store.state.api}/admin/post`, vm.post)
                    .then(function (res) {
                        vm.$helper.showNotification(res.data.message,'sentiment_satisfied_alt','success',300);
                        vm.$store.state.loading = false;
                        vm.Back();
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            getdataCkeditor(item){
                this.post.description = item;
            },
            getdataImage(item){
                this.post.image = item;
            },
            Back(){
                this.$router.push({ name: "Post" });
            },
            SortType($event) {
                var vm = this;
                vm.categories.forEach(el => {
                    if(el.id == $event.target.value){
                        vm.post.slugCategory = el.slug;
                    }
                });
            }
        }
    }
</script>