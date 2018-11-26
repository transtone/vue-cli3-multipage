import Vue from 'vue'
import App from './App.vue'
import router from '@/pages/pc/router'
import store from '@/store/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
  // data: {
  //   eventBus: new Vue()
  // }
}).$mount('#app')
