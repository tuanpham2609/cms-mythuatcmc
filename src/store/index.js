import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: 'http://localhost:8080',
    domain: 'http://127.0.0.1:8000',
  },
  mutations: {},
  actions: {},
  modules: {}
});
