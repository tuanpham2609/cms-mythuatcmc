import axios from "axios";
import store from '@/store';
import router from '@/router';
import helper from '@/plugins/helper';

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
    },
    getters: {
        authenticated(state) {
            return state.token && state.user;
        },
        user(state) {
            return state.user;
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, data) {
            state.user = data;
        }
    },
    actions: {
        async signIn({ dispatch }, credentials) {
            store.state.loading = true;
            let response = await axios.post(`${store.state.api}/api/auth/signin`, credentials);
            if(response.data.mess) {
                store.state.loading = false;
                return helper.showNotification('Vui lòng kiểm tra lại thông tin đăng nhập','sentiment_satisfied_alt','rose',300);
            } else {
                store.state.loading = false;
                return dispatch('attempt', response.data.token);
            }
        },
        async attempt({ commit, state }, token) {
            if (token) {
                commit('SET_TOKEN', token);
            }
            if (!state.token) {
                return;
            }
            try {
                let response = await axios.get(`${store.state.api}/api/auth/me`);
                commit('SET_USER', response.data);
            } catch (e) {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
            }
        },
        signOut({ commit }) {
            store.state.loading = true;
            return axios.post(`${store.state.api}/api/auth/signout`).then(() => {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
                store.state.loading = false;
            })
        }
    }
};
