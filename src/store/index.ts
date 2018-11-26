import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  key: 'planx',
  modules: ['login'],
  storage: window.localStorage
})

const getters: any = require('./getters')
import login from './modules/login'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  modules: {
    login
  },
  plugins: [vuexLocal.plugin]
})

export default store
