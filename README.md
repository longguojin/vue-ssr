 if you need more direct control of your ssr app's structure, this is a starter template for you. this scapfolding is based on Vue SSR Guide

# features

* **wepack 4,vue 2.5,vue-router,vuex and vue-meta supports**

* **each line of code is well commented**

* **on-demand code splitting** 

* **optimal chunks are preloaded / prefetched**

* **Component-level Caching**


if you like it, don't forget to give me a star, thanks.


# Getting  start 

for development
```sh
    #install packages
    npm install

    #run dev server
    npm run dev 
    # then open you browser at http://localhost:3000/
```
for production
```sh
    #build 
    npm run build

    npm run serve
```
# Q: how to add meta tags ?

```js
  export default {
    metaInfo: {
    title: "My Awesome Webapp",
    // override the parent template and just use the above title only
    titleTemplate: null
    }
  }
```
more usage , visit <a href="https://github.com/declandewet/vue-meta">vue-meta</a>

# Q: how to use store and async data ?
there are two rules to follow, first, the store's actions show return promise,
second,the asynData function should return promise as well

stroe example
```js
export default {
  namespaced: true,
  state: {
    count: 0
  },
  actions: {
    inc: ({
      commit
    }) => {
      return new Promise((rs, rj) => {
        //get asyn data
        setTimeout(() => {
          commit('inc')
          rs()
        }, 500);
      });
    }
  },
  mutations: {
    inc: state => state.count++
  }
}

```

component example
```html
<template>
  <div> 
    this is home page
    {{count}}
    <button @click="clickMe">click Me </button>
  </div>
</template>

<script>

export default {
  asyncData({ store }) {
    // return the Promise from the action
    return store.dispatch('counter/inc')
  },
  computed: {
    // display the item from store state.
    count () {
      return this.$store.state.counter.count
    },
  },
  methods: {
    clickMe() {
      this.$store.dispatch('counter/inc')
    }
  }
};
</script>
```

# Q: how to use async components ?
```js
// changing this...
import Foo from './Foo.vue'

// to this:
const Foo = () => import('./Foo.vue')
```


# More ...
except router.js and store folder, you are free to customize your project's stucture, if you need more control, follow the Vue SSR Guide and add more feature by yourself.
