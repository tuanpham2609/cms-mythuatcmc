import Vue from "vue";
import App from "./layouts/App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import helper from '@/plugins/helper.js';
import Vuelidate from 'vuelidate';
import VueMoment from 'vue-moment';

require('@/store/subscriber');
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$helper = helper;

Vue.use(Vuelidate);
Vue.use(VueMoment);

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});


