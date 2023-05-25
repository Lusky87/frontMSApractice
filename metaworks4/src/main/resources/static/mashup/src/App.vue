<template>
  <div id="app">
<!--    <vue-test></vue-test>-->
<!--    <vue-file-card></vue-file-card>-->
    <entry-component v-model="src" @change="checkHTML"/>
  </div>
</template>

<script>
import Entry from './Entry.vue'

export default {
  name: 'App',
  data: () => ({
    src: null,
  }),
  methods: {
    checkHTML(html) {
      console.log(html, this.src);
      localStorage["keditor.editing.content"] = html;
    }
  },
  created() {
    this.src = localStorage["keditor.editing.content"]
  },
  components: {
    "entry-component":Entry
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
