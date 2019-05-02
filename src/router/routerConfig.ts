import Home from '../views/home/home.vue'
import Login from '../views/login.vue'
export default [
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
          component: () => import('../views/lesson/lesson.vue'),
          meta: {
            title: '课程',
            keepAlive: true,
          }
        },
        {
          path: '/person',
          name: 'person',
          component: () => import('../views/mine/mine.vue'),
          meta: {
            title: '个人中心',
            keepAlive: true,
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
          path: '/introduction/:id',
          name: 'introduction',
          component: () => import('../views/lesson/lessonIntroduction.vue'),
          meta: {
            title: '课程介绍'
          }
        },
        {
          path: '/income',
          name: 'income',
          component: () => import('../views/mine/income.vue'),
          meta: {
            title: '收入明细'
          }
        },
        {
          path: '/apply/:mode',
          name: 'apply',
          component: () => import('../views/mine/apply.vue'),
          meta: {
            title: '申请'
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
            title: '词卡'
          }
        },
        {
          path: '/songInfo/:id',
          name: 'songInfo',
          component: () => import('../views/home/songInfo.vue'),
          meta: {
            title: '儿歌详情'
          }
        },
        {
          path: '/drawInfo/:id',
          name: 'drawInfo',
          component: () => import('../views/home/drawInfo.vue'),
          meta: {
            title: '绘本详情'
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
            title: '分销中心'
          }
        },
    
   
    
]