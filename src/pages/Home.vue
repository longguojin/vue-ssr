<template>
  <div> 
    this is home page
    {{count}}
    <button @click="clickMe">click Me </button>
  </div>
</template>

<script>

export default {
  metaInfo: {
    title: "My Awesome Webapp",
    // override the parent template and just use the above title only
    titleTemplate: null
  },
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