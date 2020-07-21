<template>
    <div class="tuanpd" id="app">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="d-flex pull-rigth">
                    <h6 class="m-0 font-weight-bold text-primary">Trang chủ</h6>
                </div>
            </div>
            <div class="card-body">
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
    export default {
        components: { Paginate ,Ckeditor},
        data() {
            return {
                list_post: {
                    current_page: 1,
                    last_page: 0,
                    total: 0,
                    per_page: 0
                },
                about:{content:'',name:'Tuan Pham'}
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
                    vm.$store.state.loading = false;
                    vm.about = res.data.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            },
            UpdateAbout(){
                var vm = this;
                this.$http.put(vm.$store.state.api+'/admin/about/' + 1, vm.about)
                .then(function (res) {
                    vm.$helper.showNotification(res.data.messsage,'sentiment_satisfied_alt','success',300);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            }
        },
        watch: {
            'list_post.current_page': function (new_val) {
            }
        }
    }
</script>