import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router/router'
import store from './store'
// import VueLazyload from 'vue-lazyload'
import util from './util/utils'
import _http from './util/myAxios'
import {createAPI} from 'cube-ui'
import 'amfe-flexible'
// 注册全局组件
import scrollPage from "@/components/scrollPage.vue";
import NoData from "@/components/noData.vue"
Vue.component('scrollPage',scrollPage)
Vue.component('NoData',NoData)
Vue.config.productionTip = false
Vue.prototype.$util = util
Vue.prototype.$http = _http
Vue.prototype.imgPre = 'http://m.vipqm.cn'

import vueClipboard from 'vue-clipboard2'
Vue.use(vueClipboard)
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: '',
//   loading: '',
//   attempt: 1
// })


const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue


