<template>
  <div id="">
    <h1 v-model="title">testVue!!!! {{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    src: null,
    title:"",
  }),
  props : {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
  },
  created() {
    this.title = "1234";
  }
}
</script>

<style>
</style>
