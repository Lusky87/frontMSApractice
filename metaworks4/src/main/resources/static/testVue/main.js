import Vue from 'vue'
import App from './App.vue'
import("./web-components");

new Vue({
  el: '#app',
  render: h => h(App)
})
