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
      component: Home
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
      path: '/feature/:id',
      name: 'feature',
      component: () => import('./views/home/songGif.vue'),
      meta:{
        title:'儿歌'
      }
    }
  ]
})
