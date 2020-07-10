<template>
  <div id="app">
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
      <navi />
    </div>
  </div>
</template>
<script>
  import AppHeader from "@/layouts/partials/header";
  import AppFooter from "@/layouts/partials/footer";
  import AppMenu from "@/layouts/partials/menu";
  import Navi from "../components/Thenavigation.vue";
  export default {
    components: {
      AppHeader,
      AppFooter,
      AppMenu,
      Navi,
    }
  }
</script>