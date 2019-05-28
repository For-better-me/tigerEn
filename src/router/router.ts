import Vue from 'vue'
import Router from 'vue-router'
import wx, { config } from 'wx-sdk-ts'
import { otherApi } from '../api/other'
import { stringify } from 'qs'
import qs from 'qs';
import store from '../store'
import routerConfig from './routerConfig';
Vue.use(Router)

const router = new Router({
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  mode:'history',
  // base:'/quhu',
  routes:routerConfig
})
interface wxconfig {
  debug: boolean;
  appId: string;
  timestamp: string;
  nonceStr: string;
  signature: string;
  jsApiList: any;
}
var u:any = navigator.userAgent;
var isiOS:boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var urlParam :string  = ''
function reqConfig(shareLink: string) {
  // let url = encodeURIComponent(shareLink)
  otherApi.jsConfig({ url:shareLink }).then((response) => {
    wxstart(response.data, shareLink);
  }).catch(() => {
    console.log('err');
  })
}

function wxstart(data: wxconfig, shareLink: string) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名，见附录1
    jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  wx.ready(() => {
    // 分享到朋友
    
    wx.onMenuShareAppMessage({
      title: "趣虎",
      desc: "如果现在不移民，你的未来将会...",
      link: isiOS?window.location.href+urlParam:shareLink+urlParam,
      imgUrl: "https://static.prim.im/8cdaa42c5887ab8c6ff0.jpeg",
      success: function () {
        // alert(urlParam)
        console.log("分享成功");
      },
      cancel: function () {
        // alert(urlParam)
        console.log("取消分享");
      }
    });
    // 分享给朋友圈
    wx.onMenuShareTimeline({
      title: "趣虎", // 分享标题
      link: isiOS?window.location.href+urlParam:shareLink+urlParam, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: "https://static.prim.im/8cdaa42c5887ab8c6ff0.jpeg", // 分享图标
      success: function () {
        // alert(urlParam)
        // 用户点击了分享后执行的回调函数
      },
      cancel: function () { }
    });
  });
}

router.beforeEach((to, from, next) => {
  // 设置浏览器标题
  document.title = to.meta.title;
  //设置分享时的用户id 
  
  // 保存分享用户的id
  if(to.query.id){
    sessionStorage.id = to.query.id
  }
  //保存登录返回的页面路径
  if(to.path.indexOf('login') == -1){
    localStorage.beforeLoginUrl = to.fullPath;
  }
 


  if (to.meta.author) {
    let user = store.getters.userInfo;
    if (!user.id && to.path != '/login') {
      next('/login')
      return false
    }


  }
  next()

})

router.afterEach((from,to)=>{
  if(store.getters.userInfo.is_distribution == 1){
   
    urlParam = '?id='+store.getters.userInfo.id
  }
   // let _url = location.href.split('#')[0]
  let _url = window.location.origin + to.fullPath
  if(!isiOS){
    reqConfig(_url)
  }
  console.log(_url, to)
})


// ios 设备进入页面则进行js-sdk签名
if(isiOS){
  if(store.getters.userInfo.is_distribution == 1){
    urlParam = '?id='+store.getters.userInfo.id
  }
  let url = window.location.href.split('#')[0]
  reqConfig(url)
}



export default router
