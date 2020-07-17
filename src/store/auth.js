import axios from "axios";
import store from '@/store';

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
            let response = await axios.post(`${store.state.api}/api/auth/signin`, credentials);
            return dispatch('attempt', response.data.token);
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
            return axios.post(`${store.state.api}/api/auth/signout`).then(() => {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
            })
        }
    }
};
