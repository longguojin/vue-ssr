import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)


export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: () =>
          import('@pages/Home.vue')
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import( /* webpackChunkName: "about" */ '@pages/About.vue')
      }
    ]
  })
}
