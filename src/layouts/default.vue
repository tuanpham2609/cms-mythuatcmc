<template>
  <div id="app">
    <div id="loading-box" class="text-center" v-if="$store.state.loading">
      <img src="/static/img/loading.gif" />
    </div>
    <div id="wrapper">
      <app-header />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <app-menu />
          <div class="container-fluid">
            <router-view />
          </div>
        </div>
        <app-footer />
      </div>
    </div>
  </div>
</template>
<style  scope>
  #loading-box{
    z-index: 100000000000;
    background: #ffffff78;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    transition: all .4s ease-out;
    opacity: 1;
    height: 100%;
  }
  #loading-box img{
    max-width: 120px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #loading-box.close{
    opacity: 0;
    display: none;
  }
</style>
<script>
  import AppHeader from "@/layouts/partials/header";
  import AppFooter from "@/layouts/partials/footer";
  import AppMenu from "@/layouts/partials/menu";
  export default {
    components: {
      AppHeader,
      AppFooter,
      AppMenu,
    }
  }
</script>