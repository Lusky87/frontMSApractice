 /*eslint-disable*/
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Managing from "./components";
import router from './router';
///// web components 
import wrap from '@vue/web-component-wrapper';
//import VueWebComponent from './components/VueWebComponent';

Vue.config.productionTip = false;

const axios = require("axios").default;

// backend host url
axios.backend = null; //"http://localhost:8088";

// axios.backendUrl = new URL(axios.backend);
axios.fixUrl = function(original){

  if(!axios.backend && original.indexOf("/")==0) return original;

  var url = null;

  try{
    url = new URL(original);
  }catch(e){
    url = new URL(axios.backend + original);
  }

  if(!axios.backend) return url.pathname;

  url.hostname = axios.backendUrl.hostname;
  url.port = axios.backendUrl.port;

  return url.href;
}

const templateFiles = require.context("./components", true);
Vue.prototype.$ManagerLists = [];
templateFiles.keys().forEach(function(tempFiles) {
  if (!tempFiles.includes("Manager.vue") && tempFiles.includes("vue")) {
    Vue.prototype.$ManagerLists.push(
      tempFiles.replace("./", "").replace(".js", "")
    );
  }
});
// Vue.use(Managing);
const pluralCaseList = []


pluralCaseList.push( {plural: "dashboards", pascal: "Dashboard"} )
pluralCaseList.push( {plural: "files", pascal: "File"} )
pluralCaseList.push( {plural: "indices", pascal: "Index"} )
pluralCaseList.push( {plural: "videos", pascal: "Video"} )


// const OrderFormElement = wrap(Vue, OrderForm);
// const VueComponentElement = wrap(Vue, App2);

//window.customElements.define('my-custom-element', CustomElement);
// window.customElements.define('order-form', OrderFormElement);
// window.customElements.define('vue-component', VueComponentElement);

Vue.prototype.$ManagerLists.forEach(function(item, idx) {
  pluralCaseList.forEach(function(tmp) {
    if(item.toLowerCase() == tmp.pascal.toLowerCase()) {
      var obj = {
        name: item,
        plural: tmp.plural
      }
      Vue.prototype.$ManagerLists[idx] = obj
    }
  })
})

import("./web-components");

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#vueApp");
