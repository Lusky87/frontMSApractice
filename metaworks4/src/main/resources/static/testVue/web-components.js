import Vue from "vue";
import App from "./App"
// import { createApp, h } from "vue";
// import wrapper from "vue3-webcomponent-wrapper";
import wrap from '@vue/web-component-wrapper';

// const testElement = wrapper(App, createApp, h);
const testElement = wrap(Vue, App);

//window.customElements.define('my-custom-element', CustomElement);
// window.customElements.define('order-form', OrderFormElement);
// window.customElements.define('vue-component', VueComponentElement);
window.customElements.define('vue-test', testElement);
export default testElement;
