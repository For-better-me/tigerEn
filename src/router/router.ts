import Vue from 'vue'
import Router from 'vue-router'
import reqConfig from '../util/enjoyWx'
import { stringify } from 'qs'
import qs from 'qs';
import store from '../store'
import routerConfig from './routerConfig';
import _util from '../util/utils'
Vue.use(Router)

const router = new Router({
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  mode: 'history',
  // base:'/quhu',
  routes: routerConfig
})

var u: any = navigator.userAgent;
var isiOS: boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var urlParam: string = ''

router.beforeEach((to, from, next) => {
  // 设置浏览器标题
  document.title = to.meta.title;
  //设置分享时的用户id 

  //保存登录返回的页面路径
  if (to.path.indexOf('login') == -1) {
    localStorage.beforeLoginUrl = to.fullPath;
  }

  // let user = store.getters.userInfo;
  // if (!user.id && to.path != '/login') {
  //   next('/login')
  //   return false
  // }
  next()

})

router.afterEach((to, from) => {
  let user = store.getters.userInfo;
  if (!user.id && to.path != '/login') {
    router.replace('/login')
    return;
  }
  if (to.meta.is_distribution && store.getters.userInfo.is_distribution == 0) {
    router.replace('/')
    return;
  }
  // if(store.getters.userInfo.is_distribution == 1){

  //   urlParam = '?id='+store.getters.userInfo.id
  // }
  // let _url = location.href.split('#')[0]

  if (!isiOS) {
    let _url = window.location.origin + to.fullPath
    reqConfig(_url)
    console.log(_url, to)
  }

})

export default router
