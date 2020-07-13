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
                <th>Name</th>
                <th>Nội dung</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in abouts" :key="index">
                <td>{{index + 1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.content}}</td>
                <td v-html="item.content"></td>
                <td>
                  <button class="btn btn-primary edit" data-toggle="modal" data-target="#edit" type="button"
                    @click.stop.prevent="editCate(item.id)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-danger delete" type="button" @click.stop.prevent="removeCate(item.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="paginate">
            <paginate :current="list_post.current_page" v-model="list_post.current_page" :total="list_post.last_page">
            </paginate>
          </div>
        </div>
      </div>
      <ckeditor v-on:dataCkeditor="getdataCkeditor"></ckeditor>
      <upload-img></upload-img>
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
                    <input class="form-control" placeholder="Nhập tên thể loại" v-model="about.name">
                  </fieldset>
                  <fieldset class="form-group">
                    <label>Nội dung:</label>
                    <input class="form-control" placeholder="Nhập tên thể loại" v-model="about.content">
                    <ckeditor></ckeditor>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click.stop.prevent="addNew()">Save</button>
            <button type="reset" class="btn btn-primary">Làm Lại</button>
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
            <h5 class="modal-title" id="exampleModalLabel">Chỉnh sửa</h5>
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
                    <input class="form-control" placeholder="Nhập tên thể loại" v-model="about.name">
                  </fieldset>
                  <fieldset class="form-group">
                    <label>Nội dung:</label>
                    <input class="form-control" placeholder="Nhập tên thể loại" v-model="about.content">
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
  import Modal from '@/components/modal';
  import Ckeditor from '@/components/ckeditor';
  import UploadImg from '@/components/imageUploader';
  export default {
    components: { Pagi, Modal,Ckeditor,UploadImg},
    data() {
      return {
        about: {},
        abouts: [],
        list_post: {
          current_page: 1,
          last_page: 0,
          total: 0,
          per_page: 0
        }
      }
    },
    created() {
      this.getListAbout();
    },
    methods: {
      getListAbout() {
        var vm = this;
        vm.$http.get(`/admin/about?page=${this.list_post.current_page}`)
          .then(function (res) {
            vm.abouts = res.data.abouts.data;
            vm.list_post.current_page = res.data.abouts.current_page;
            vm.list_post.last_page = res.data.abouts.last_page;
            vm.list_post.total = res.data.abouts.total;
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      addNew() {
        this.$http.post('/admin/about', { name: this.about.name, content: this.about.content })
          .then(function (res) {
            console.log(res)
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      editCate(item) {
        var vm = this;
        this.$http.get('admin/about/' + item + '/edit')
          .then(function (res) {
            $('#edit').modal('show');
            vm.about = res.data.data;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      },
      updateCate() {
        var vm = this;
        this.$http.put('admin/about/' + vm.about.id, vm.about)
          .then(function (res) {
            console.log(res);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      },
      removeCate(item) {
        var vm = this;
        this.$http.delete('admin/about/' + item)
          .then(function (res) {
            console.log(res);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      },
      getdataCkeditor(item){
        this.about.content = item;
      }
    },
    watch: {
      'list_post.current_page': function (new_val) {
        this.getListAbout();
      }
    }
  }
</script>