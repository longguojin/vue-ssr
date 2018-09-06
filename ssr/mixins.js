import Vue from 'vue'

import {
  storeModule
} from '@ssr/utils'


//a global mixin that calls `module` to register and unregister store
export function storeModuleMixin() {
  Vue.mixin({
    // 重要信息：当多次访问路由时，
    // 避免在客户端重复注册模块。
    destroyed() {
      //register store modules
      const {
        stores
      } = this.$options;

      if (stores) {
        //unrestistre store modules
        storeModule(this.$store, stores,false)
      }

    },
  })
}

//a global mixin that calls `asyncData` when a route component's params change
export function asyncDataMixin() {
  Vue.mixin({
    beforeRouteUpdate(to, from, next) {
      const {
        asyncData
      } = this.$options

      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to
        }).then(next).catch(next)
      } else {
        next()
      }
    }
  })
}
