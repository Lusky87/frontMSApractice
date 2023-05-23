 /*eslint-disable*/
 import Vue, { createApp } from "vue";
 import App from "./App.vue";
//  import vuetify from "./plugins/vuetify";
 import Managing from "./components";
 import router from './router';
//  Vue.config.productionTip = false;
 const app = createApp();
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
 
//  const templateFiles = require.context("./components", true);
//  app.prototype.$ManagerLists = [];
//  templateFiles.keys().forEach(function(tempFiles) {
//    if (!tempFiles.includes("Manager.vue") && tempFiles.includes("vue")) {
//      app.prototype.$ManagerLists.push(
//        tempFiles.replace("./", "").replace(".vue", "")
//      );
//    }
//  });
//  app.use(Managing);
 const pluralCaseList = []
 
 pluralCaseList.push( {plural: "dashboards", pascal: "Dashboard"} )
 pluralCaseList.push( {plural: "files", pascal: "File"} )
 pluralCaseList.push( {plural: "indices", pascal: "Index"} )
 pluralCaseList.push( {plural: "videos", pascal: "Video"} )
 
//  app.prototype.$ManagerLists.forEach(function(item, idx) {
//    pluralCaseList.forEach(function(tmp) {
//      if(item.toLowerCase() == tmp.pascal.toLowerCase()) {
//        var obj = {
//          name: item,
//          plural: tmp.plural
//        }
//        app.prototype.$ManagerLists[idx] = obj
//      }
//    })
//  })
 
 const mount = (el) => {
    const app = createApp(App);
    app.use(router);
    app.mount(el)
}

//  new Vue({
//    vuetify,
//    router,
//    render: h => h(App)
//  }).$mount("#app");
 


// import { createApp } from 'vue'
// import App from './App'

// if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#app')
    // if (devRoot) {
    mount(devRoot)
    // }
// }

export { mount }