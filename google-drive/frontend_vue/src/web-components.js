import Vue from "vue";
import wrap from '@vue/web-component-wrapper';
import App2 from "./App2";
import FileCards from "./components/listers/FileCards";
import FileLists from "./components/listers/FileList";
import FileTables from "./components/listers/FileTable";
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

// const VueComponentElement = wrap(Vue, App2);
const fileCardElement = wrap(Vue, FileCards);
const fileListElement = wrap(Vue, FileLists);
const fileTableElement = wrap(Vue, FileTables);

//window.customElements.define('my-custom-element', CustomElement);
// window.customElements.define('order-form', OrderFormElement);
// window.customElements.define('vue-component', VueComponentElement);
window.customElements.define('vue-file-card', fileCardElement);
window.customElements.define('vue-file-list', fileListElement);
window.customElements.define('vue-file-table', fileTableElement);

export default App2;