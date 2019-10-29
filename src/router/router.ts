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
  console.log(from,to)
  document.title = to.meta.title;
  //设置分享时的用户id 

  //保存登录返回的页面路径
  if (to.path.indexOf('login') == -1) {
    localStorage.beforeLoginUrl = to.fullPath;
  }

  // let user = store.getters.userInfo;

  if (to.path != '/login') {
    if (!localStorage.token) {
      // next({
      //   replace: true,
      //   path: '/login'
      // })
      router.replace('/login')
      next()
      return false
    } else {
      // 如果有token 但是vuex中没有用户登录信息则做登录操作
      // let time: number = localStorage.time;
      // let now: number = new Date().getTime()
      // let secondHDay: number = 24 * 60 * 60 * 1000
      // const Expire_Date = 1//token有效期
      // if ((now - time) / secondHDay < Expire_Date) {
       
      // } else {
      //   next({
      //     replace: true,
      //     path: '/login'
      //   })
      //   return false
      // }
      
      next()
      

    }

  } else {
    next()
  }


})

router.afterEach((to, from) => {
  store.commit('SET_LIST',to.path)
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
