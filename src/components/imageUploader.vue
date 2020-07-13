<template>
    <div>
        <input @change="onFileChanged" type="file" accept="image/*">
        <modal v-if="showModal" v-on:cropImage="getImageCrop" :imgSrc="userImage" @close="showModal = false"></modal>
    </div>
</template>
<script>
    import Modal from '@/components/modal';
    export default {
        components: { Pagi, Modal,Ckeditor },
        data() {
            return {
                showModal: false,
                userImage: '',
            }
        },
        methods: {
            onFileChanged(event) {
                var files = event.target.files || event.dataTransfer.files;
                if (!files.length) {
                return;
                }
                this.selected_file = files[0];
                this.createImage(files[0]);
            },
            createImage (file) {
                var reader = new FileReader();
                var _this = this;
                reader.onload = (e) => {
                _this.userImage = e.target.result;
                this.showModal = true;
                }
                reader.readAsDataURL(file);
            },
            getImageCrop (img) {
                this.onUpload(img);
                this.$forceUpdate();
            },
            onUpload(img){
                this.$http.post('/admin/upload-img', { image: img })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
        },
    }
</script>