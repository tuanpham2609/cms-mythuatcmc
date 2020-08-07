<template>
    <div class="tuanpd" id="app">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-flex pull-rigth">
                    <h6 class="m-0 font-weight-bold text-primary">Trang chủ</h6>
                </div>
            </div>
            <div class="card-body">
                <div class="logo">
                    <label>Cấu hình logo:</label> 
                    <uploadimg v-on:dataImages="getdataImage" :data="data.image"></uploadimg>
                    <label>Cấu hình Banner:</label> 
                    <div class="d-flex" >
                        <uploadimgs v-on:dataImages="getdataImage1" :data="data.data"></uploadimgs>
                    </div>
                    <button type="button" class="btn btn-primary mb-2" @click.stop.prevent="UpdateImage()">Update Image</button>
                </div>
                <hr>
                <div class="about">
                    <label>Cấu hình about:</label> 
                    <ckeditor v-on:dataCkeditor="getdataCkeditor" v-model.trim="$v.about.content.$model" :data="about.content"></ckeditor> 
                    <p class="validation" :class="{ 'validation-active': $v.about.content.$error }" v-if="!$v.about.content.required">
                        About không được để trống !!
                    </p>
                    <button type="button" class="btn btn-primary mt-2" @click.stop.prevent="UpdateAbout()" :disabled="$v.$invalid">Update About</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Paginate from '@/components/paginate';
    import { required, minLength } from 'vuelidate/lib/validators';
    import Ckeditor from '@/components/ckeditor';
    import Uploadimg from '@/components/imageUploader';
    import Uploadimgs from '@/components/uploadFiles';

    export default {
        components: { Paginate ,Ckeditor,Uploadimg,Uploadimgs},
        data() {
            return {
                about:{content:'',name:'Tuan Pham'},
                data: {
                    image:'',
                    data:[]
                }
            }
        },
        validations:{
            about: {
                content: {
                    required,
                }
            }
        },
        created() {
            this.editAbout();
        },
        methods: {
            getdataCkeditor(item){
                this.about.content = item;
            },
            editAbout() {
                var vm = this;
                vm.$store.state.loading = true;
                this.$http.get(vm.$store.state.api+'/admin/about/' + 1 + '/edit')
                .then(function (res) {
                    vm.about = res.data.data;
                    vm.data = res.data.home;
                    vm.$store.state.loading = false;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            },
            UpdateAbout(){
                var vm = this;
                vm.$store.state.loading = true;
                this.$http.put(vm.$store.state.api+'/admin/about/' + 1, vm.about)
                .then(function (res) {
                    vm.$store.state.loading = false;
                    vm.$helper.showNotification(res.data.messsage,'sentiment_satisfied_alt','success',300);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            },
            getdataImage(item){
                this.data.image = item;
            },
            getdataImage1(item){
                this.data.data.push(item);
            },
            UpdateImage(){
                var vm = this;
                vm.$store.state.loading = true;
                this.$http.put(vm.$store.state.api+'/admin/home/'+1,vm.data)
                .then(function (res) {
                    vm.$store.state.loading = false;
                    vm.editAbout();
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            }
        },
    }
</script>