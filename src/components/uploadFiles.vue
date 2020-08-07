<style>
    .upload-img {
        border: 0.07142857rem dashed #cfd1d6;
        padding: 0.28571429rem;
        margin-bottom: 1.07142857rem !important;
        text-align: center;
        border-radius: 0.57142857rem;
        position: relative;
        overflow: hidden;
        display: inline-block;
        height: 10rem;
        width: 10rem;
    }
    .add-image {
        width: 4rem;
        height: 4rem;
        margin: 1.14285714rem auto;
    }
    .upload-img .action-button {
        position: absolute;
        bottom: 0.42857143rem;
        width: 9.28571429rem;
        z-index: 2;
    }
    .upload-img .action-button label {
        margin: 0;
        cursor: pointer;
    }
</style>
<template>
    <div>
        <template v-if="dataImages && dataImages.length > 0">
            <div class="upload-img mr-2" v-for="(item, index) in dataImages" :key="index">
                <img v-if="item" alt="add image" :src="$store.state.domain+'/img/'+item" class="img-fluid">
                <img v-else alt="add image" src="static/img/upload-file.png" class="add-image">
                <div class="action-button">
                    <button class="btn btn-primary" type="button">
                        <label>
                            <span>Upload image</span>
                            <input @change="onFileChanged" @click="removeImg(index)" type="file" accept="image/*" hidden>
                        </label>
                    </button>
                </div>
            </div>
        </template>
        <modal v-if="showModal" v-on:cropImage="getImageCrop" :imgSrc="userImage" @close="showModal = false"></modal>
    </div>
</template>
<script>
    import Modal from '@/components/modal';
    export default {
        components: { Modal },
        data() {
            return {
                showModal: false,
                userImage: '',
                dataImage:'',
                dataImages: []
            }
        },
        props:['data'],
        methods: {
            onFileChanged(event) {
                var files = event.target.files || event.dataTransfer.files;
                if (!files.length) {
                    return;
                }
                this.selected_file = files[0];
                this.createImage(files[0]);
            },
            createImage(file) {
                var reader = new FileReader();
                var _this = this;
                reader.onload = (e) => {
                    _this.userImage = e.target.result;
                    this.showModal = true;
                }
                reader.readAsDataURL(file);
            },
            getImageCrop(img) {
                this.onUpload(img);
                this.$forceUpdate();
            },
            onUpload(img) {
                var vm = this;
                vm.$store.state.loading = true;
                vm.$http.post(vm.$store.state.api+'/admin/upload-img', { image: img })
                    .then(function (res) {
                        vm.dataImage = res.data.data.img;
                        vm.$emit('dataImages', vm.dataImage);
                        vm.showModal = false;
                        vm.$store.state.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            removeImg(index){
                this.dataImages.splice(index,1);
            }
        },
        watch: {
            'data':function(){
                this.dataImages = this.data;
            }
        },
    }
</script>