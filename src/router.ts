import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/home.vue'
import Login from './views/login.vue'
import wx, { config } from 'wx-sdk-ts'
import { otherApi } from './api/other'
import { stringify } from 'qs'
import qs from 'qs';
import store from './store'
Vue.use(Router)

const router = new Router({
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '趣虎',
        keepAlive: false,
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '趣虎',
        keepAlive: true,
      }
    },
    {
      path: '/lesson',
      name: 'lesson',
      component: () => import('./views/lesson/lesson.vue'),
      meta: {
        title: '课程',
        keepAlive: true,
      }
    },
    {
      path: '/person',
      name: 'person',
      component: () => import('./views/mine/mine.vue'),
      meta: {
        title: '个人中心',
        keepAlive: true,
      }
    },
    {
      path: '/song',
      name: 'song',
      component: () => import('./views/home/song.vue'),
      meta: {
        title: '儿歌',
        keepAlive: true,
      }
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: () => import('./views/lesson/lessonIntroduction.vue'),
      meta: {
        title: '课程介绍'
      }
    },
    {
      path: '/income',
      name: 'income',
      component: () => import('./views/mine/income.vue'),
      meta: {
        title: '收入明细'
      }
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('./views/mine/apply.vue'),
      meta: {
        title: '申请'
      }
    },
    {
      path: '/draw',
      name: 'draw',
      component: () => import('./views/home/draw.vue'),
      meta: {
        title: '绘本',
        keepAlive: true,
      }
    },
    {
      path: '/cartoon',
      name: 'cartoon',
      component: () => import('./views/home/gif.vue'),
      meta: {
        title: '动画',
        keepAlive: true,
      }
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('./views/home/card.vue'),
      meta: {
        title: '词卡'
      }
    },
    {
      path: '/songInfo',
      name: 'songInfo',
      component: () => import('./views/home/songInfo.vue'),
      meta: {
        title: '儿歌详情'
      }
    },
    {
      path: '/drawInfo',
      name: 'drawInfo',
      component: () => import('./views/home/drawInfo.vue'),
      meta: {
        title: '绘本详情'
      }
    },
    {
      path: '/lessonRecord',
      name: 'lessonRecord',
      component: () => import('./views/mine/lessonRecord.vue'),
      meta: {
        title: '浏览记录',
      }
    },
    {
      path: '/retailCenter',
      name: 'retailCenter',
      component: () => import('./views/mine/retailCenter.vue'),
      meta: {
        title: '分销中心'
      }
    },

  ]
})
interface wxconfig {
  debug: boolean;
  appId: string;
  timestamp: string;
  nonceStr: string;
  signature: string;
  jsApiList: any;
}
function reqConfig(shareLink: string) {
  otherApi.jsConfig({ url: shareLink }).then((response) => {
    wxstart(response.data, shareLink);
  }).catch(() => {
    console.log('err');
  })
}

function wxstart(data: wxconfig, shareLink: string) {
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名，见附录1
    jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  wx.ready(() => {
    // 分享到朋友
    wx.onMenuShareAppMessage({
      title: "测试未来",
      desc: "如果现在不移民，你的未来将会...",
      link: 'https://www.tjitfw.com/',
      imgUrl: "https://static.prim.im/8cdaa42c5887ab8c6ff0.jpeg",
      success: function () {
        console.log("分享成功");
      },
      cancel: function () {
        console.log("取消分享");
      }
    });
    // 分享给朋友圈
    wx.onMenuShareTimeline({
      title: "如果不移民，你的未来会怎样", // 分享标题
      link: 'https://www.tjitfw.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: "https://static.prim.im/8cdaa42c5887ab8c6ff0.jpeg", // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
      },
      cancel: function () { }
    });
  });
}
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let _url = window.location.origin + to.fullPath
  _url = encodeURIComponent(_url)
  reqConfig(_url)
  console.log(_url, to)
  if (to.meta.author) {
    if (!store.state.user.id && to.path != '/login') {
      localStorage.beforeLoginUrl =  to.fullPath;
      next('/login')
      return false
    }


  }
  next()

})

// router.afterEach((to, from) => {
//   let _url = window.location.origin + to.fullPath
//   // 非ios设备，切换路由时候进行重新签名

//   // 微信分享配置
//   wx.ready(function () {
//     // wx.onMenuShareTimeline({
//     //  ...
//     // })
//     // wx.onMenuShareAppMessage({
//     //   ...
//     // })
//   })
// })


// ios 设备进入页面则进行js-sdk签名



export default router
