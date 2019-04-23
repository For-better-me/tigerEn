import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/home.vue'

Vue.use(Router)

export default new Router({
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        title:'趣虎'
      }
    },
    {
      path: '/lesson',
      name: 'lesson',
      component: () => import('./views/lesson/lesson.vue'),
      meta:{
        title:'课程'
      }
    },
    {
      path: '/person',
      name: 'person',
      component: () => import('./views/mine/mine.vue'),
      meta:{
        title:'个人中心'
      }
    },
    {
      path: '/song',
      name: 'song',
      component: () => import('./views/home/song.vue'),
      meta:{
        title:'儿歌'
      }
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: () => import('./views/lesson/lessonIntroduction.vue'),
      meta:{
        title:'课程介绍'
      }
    },
    {
      path: '/income',
      name: 'income',
      component: () => import('./views/mine/income.vue'),
      meta:{
        title:'收入明细'
      }
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('./views/mine/apply.vue'),
      meta:{
        title:'申请'
      }
    },
    {
      path: '/draw',
      name: 'draw',
      component: () => import('./views/home/draw.vue'),
      meta:{
        title:'绘本'
      }
    },
    {
      path: '/cartoon',
      name: 'cartoon',
      component: () => import('./views/home/gif.vue'),
      meta:{
        title:'动画'
      }
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('./views/home/card.vue'),
      meta:{
        title:'词卡'
      }
    },
    
  ]
})
