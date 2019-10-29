import Home from '../views/home/home.vue'
import Login from '../views/login.vue'
export default [
        {
          path: '/login',
          name: 'login',
          component: Login,
          meta: {
            title: '登录',
            keepAlive: false,
          }
        },
        {
          path: '*',
          name: '404',
          component: Home,
          meta: {
            title: '首页',
            keepAlive: true,
          }
        },
        {
          path: '/',
          name: 'home',
          component: Home,
          meta: {
            title: '首页',
            keepAlive: true,
            isTab:true
          }
        },
        {
          path: '/lesson',
          name: 'lesson',
          component: () => import('../views/lesson/lesson.vue'),
          meta: {
            title: '课程',
            keepAlive: true,
            isTab:true
          }
        },
        {
          path: '/person',
          name: 'person',
          component: () => import('../views/mine/mine.vue'),
          meta: {
            title: '个人中心',
            keepAlive: false,
            author:true,
            isTab:true
          }
        },
        {
          path: '/song',
          name: 'song',
          component: () => import('../views/home/song.vue'),
          meta: {
            title: '儿歌',
            keepAlive: true,
          }
        },
        {
          path: '/introduction/:lessonId',
          name: 'introduction',
          component: () => import('../views/lesson/lessonIntroduction.vue'),
          meta: {
            title: '课程介绍',
            keepAlive: false,
          }
        },
        {
          path: '/introductionMy/:lessonId',
          name: 'introductionMy',
          component: () => import('../views/mine/lessonMyIntro.vue'),
          meta: {
            title: '课程介绍',
            keepAlive: false,
          }
        },
        {
          path: '/detail/:id/:type',//type详情来源，1：普通课程，2：试听，3：我的课程
          name: 'detail',
          component: () => import('../views/lesson/lessonInfo.vue'),
          meta: {
            title: '课程详情',
            keepAlive: false,
          }
        },
        {
          path: '/income',
          name: 'income',
          component: () => import('../views/mine/income.vue'),
          meta: {
            title: '收入明细',
            is_distribution:true,
            keepAlive: false,
          }
        },
        {
          path: '/apply/:mode',
          name: 'apply',
          component: () => import('../views/mine/apply.vue'),
          meta: {
            title: '申请',
            keepAlive: false,
          }
        },
        {
          path: '/draw',
          name: 'draw',
          component: () => import('../views/home/draw.vue'),
          meta: {
            title: '绘本',
            keepAlive: true,
          }
        },
        {
          path: '/cartoon',
          name: 'cartoon',
          component: () => import('../views/home/gif.vue'),
          meta: {
            title: '动画',
            keepAlive: true,
          }
        },
        {
          path: '/card',
          name: 'card',
          component: () => import('../views/home/card.vue'),
          meta: {
            title: '词卡',
            keepAlive: true,
          }
        },
        {
          path: '/songInfo/:id',
          name: 'songInfo',
          component: () => import('../views/home/songInfo.vue'),
          meta: {
            title: '儿歌详情',
            keepAlive: true,
          }
        },
        {
          path: '/drawInfo/:id',
          name: 'drawInfo',
          component: () => import('../views/home/drawInfo.vue'),
          meta: {
            title: '绘本详情',
            keepAlive: true,
          }
        },
        {
          path: '/lessonRecord/:type',
          name: 'lessonRecord',
          component: () => import('../views/mine/lessonRecord.vue'),
          meta: {
            title: '浏览记录',
          }
        },
        {
          path: '/retailCenter',
          name: 'retailCenter',
          component: () => import('../views/mine/retailCenter.vue'),
          meta: {
            title: '合伙人中心',
            is_distribution:true
          }
        },
        {
          path: '/retailSpread',
          name: 'retailSpread',
          component: () => import('../views/mine/retailSpread.vue'),
          meta: {
            title: '推广二维码',
            is_distribution:true
          }
        },
        {
          path: '/aboutUs',
          name: 'aboutUs',
          component: () => import('../views/mine/aboutUs.vue'),
          meta: {
            title: '联系我们',
            keepAlive: true,
          }
        },
    
   
    
]