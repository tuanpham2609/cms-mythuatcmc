import Vue from "vue";
import App from "./layouts/App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

require('@/store/subscriber');
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
store.dispatch('auth/attempt', localStorage.getItem('token')).then(()=>{
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});


