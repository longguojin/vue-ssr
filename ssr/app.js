import Vue from 'vue'
import App from '@/App.vue'
import {
  sync
} from 'vuex-router-sync'
import {
  createRouter
} from '@/router'
import {
  createStore
} from '@store/index'
import {
  storeModuleMixin
} from '@ssr/mixins'

// export a factory function for creating fresh app, router and store
// instances
export function createApp() {

  // create router instance
  const router = createRouter()

  // create store instance
  const store = createStore()

  // sync so that route state is available as part of the store
  sync(store, router)

  //regstire store modules
  storeModuleMixin();



  // create the app instance, injecting both the router and the store
  const app = new Vue({
    router,
    store,
    // the root instance simply renders the App component.
    render: h => h(App)
  })

  // expose the app, the router and the store.
  return {
    app,
    router,
    store
  }
}
