<template>
  <div class="tuanpd" id="app">
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <div class="d-flex pull-rigth">
          <h6 class="m-0 font-weight-bold text-primary">ảnh</h6>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in images" :key="index">
                <td>{{index + 1}}</td>
                <td>
                    <img :src="$store.state.api+'/img/'+item.img" class="img-fluid" width="100px">
                </td>
                <td>
                  <button class="btn btn-danger delete" type="button" @click.stop.prevent="removeImg(item.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        images:[]
      }
    },
    created() {
      this.getListImg();
    },
    methods: {
      getListImg() {
        var vm = this;
        vm.$http.get(`${vm.$store.state.api}/admin/upload-img`)
          .then(function (res) {
            vm.images = res.data.images;
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      removeImg(id){
        var vm = this;
        vm.$http.delete(`${vm.$store.state.api}/admin/upload-img/${id}`)
          .then(function (res) {
            console.log(res);
            vm.getListImg();
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    },
    watch: {
    }
  }
</script>