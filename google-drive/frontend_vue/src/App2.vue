<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.svg" width="50" height="50">-->
<!--    <OrderForm msg="Welcome to Your Vue.js App"/>-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <FileCards/>
  </div>
</template>

<script>
import FileCards from './components/listers/FileCards.vue'
// import App from './App.vue'
// import HelloWorld from './components/HelloWorld.vue'
// import OrderForm from './components/OrderForm.vue'

export default {
  name: 'App2',
  components: {
    FileCards
    // ,HelloWorld
    // OrderForm
  },
  data: () => ({
    useComponent: "",
    drawer: true,
    components: [],
    sideBar: true,
    urlPath: null,
  }),

  async created() {
    var path = document.location.href.split("#/")
    this.urlPath = path[1];

  },

  mounted() {
    var me = this;
    me.components = this.$ManagerLists;
  },

  methods: {
    openSideBar(){
      this.sideBar = !this.sideBar
    },
    changeUrl() {
      var path = document.location.href.split("#/")
      this.urlPath = path[1];
    },
    goHome() {
      this.urlPath = null;
    },
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