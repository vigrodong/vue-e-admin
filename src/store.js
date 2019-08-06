import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:null,
    windowWidth:window.innerWidth,
    windowHeight:window.innerHeight
  },
  mutations: {
    SET_USERINFO(state,payload){
      state.userInfo = payload
    },
    SET_W_H(state,payload){
      state.windowWidth = payload.width
      state.windowHeight = payload.height
    }
  },
  getters:{
    userInfo:state=>state.userInfo,
    windowWidth:state=>state.windowWidth,
    windowHeight:state=>state.windowHeight,

  },
  actions: {
    setWH({ commit, state },payload){
      commit('SET_W_H',payload)
    }
  }
})
