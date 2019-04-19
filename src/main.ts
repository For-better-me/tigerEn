import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueLazyload from 'vue-lazyload'
import util from './util/utils'
import {createAPI} from 'cube-ui'
import 'amfe-flexible'
Vue.config.productionTip = false
Vue.prototype.$util = util
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: '',
//   loading: '',
//   attempt: 1
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

