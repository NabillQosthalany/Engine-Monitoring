import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)
export default new Vuex.Store({
state: {
    listproject: [],
    listServer:[]
  },
  getters: {
  },
  mutations: {
    SET_PROJECT(state, data) {
      state.listproject = data
    },
    SET_SERVER(state, data) {
      state.listServer = data
    }

  },

  actions: {
    getProject({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/project/').then(res => {
          commit('SET_PROJECT', res.data);
          resolve(res)
        })
            .catch(err => {
              reject(err)
            })

      })
    },
    getServer({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/server/').then(res => {
          commit('SET_SERVER', res.data);
          resolve(res)
        })
            .catch(err => {
              reject(err)
            })

      })
    },
  },
  modules: {
  }
})
