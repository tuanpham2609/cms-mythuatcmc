<template>
<div>
  <editor :init="config" v-model="value"></editor>
</div>
 </template>

 <script>
 import Editor from '@tinymce/tinymce-vue'

 export default {
   components: {
     'editor': Editor
   },
   data() {
     return {
       config: {},
       value:'',
       img:''
     }
   },
   created() {
     this.initEditor();
   },
   methods: {
    initEditor() {
      var vm = this;
      this.config = {
          plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste autoresize'
          ],
          paste_data_images: true,
          // plugins: 'a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
          toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
          image_advtab: true,
          file_picker_callback: function(cb, value, meta, ) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = function() {
              var files = event.target.files || event.dataTransfer.files;
              if (!files.length) {
                return;
              }
              var image = new Image();
              var reader = new FileReader();
              reader.onload = (e) => {
                vm.img = e.target.result;
                vm.$http.post('/admin/upload-img', { image: vm.img })
                .then(function (res) {
                  console.log(res.data.data.img)
                  cb(`${vm.$store.state.api}/img/${res.data.data.img}`)
                })
                .catch(function (error) {
                  console.log(error);
                })
              };
              reader.readAsDataURL(files[0]);
            };
            input.click();
          }
      };
    },
   },
   watch: {
     'value':function(){
        this.$emit('dataCkeditor', this.value);
     }
   },
 }
 </script>