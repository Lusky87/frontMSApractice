<template>
  <div>
    <div id="create" data-app>
  <!--    <vue-test ></vue-test>-->

  <!--    <order-form></order-form>-->
      <mash-up v-model="src" @change="checkHTML"/>
      <v-dialog
          v-model="dialog"
          max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-text-field label="Url" v-model="snippet.url"></v-text-field>
            <v-text-field label="tag-name" v-model="snippet.tagName"></v-text-field>

            <small class="grey--text">* This doesn't actually save.</small>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                text
                color="primary"
                @click="importSnippet"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <component
          v-for="item in components"
          :is="item.component"
          :key="item.id"
          :id="item.id"
      ></component>
    </div>
  </div>
</template>
<script src="http://localhost:5003/vue-component.js"></script>
<script>
// import Vue from 'vue';
// import { defineCustomElement } from 'vue';
import Mashup from './components/Mashup.vue';
const axios = require('axios').default;
export default {
  name: "entry-component",
  data: () => ({
    components:[],
    src:null,
    absolute:true,
    direction: 'top',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    dialog: false,
    transition: 'slide-y-reverse-transition',
    snippet:{
      // url:"http://127.0.0.1:5003/vue-component.js",
      url:"/vue/vue-component.js",
      tagName:"vue-component"
    }
  }),
  methods: {
    checkHTML(html) {
      console.log(html, this.src);
      localStorage["keditor.editing.content"] = html;
    },
    init() {
      // this.$children.forEach(child => {
      //   console.log(child);
      // })
    },
    async importSnippet() {
      const me = this;
      const response = await axios.get(me.snippet.url);
      // const MyComponent2 = eval(response.data);
      // const MyComponent = await import('./components/Snippets.vue');
      // document.write("<script src=\""+me.snippet.url+"\"/>");

      const MyComponent = await import(me.snippet.url);
      Vue.component(me.snippet.tagName, MyComponent)
      // const resp = response.data;
      // Dynamically import the component using the response from Axios
      // const component = await import(resp);
      // customElements.define(me.snippet.tagName, MyComponent)
      // const componentInfo = {
      //     component:MyComponent,
      //     id: 'dynamic-componenet-'+me.snippet.tagName,
      //     key: 'dynamic-componenet-'+ 1,
      //     ref: 'dynamic-componenet-'+me.snippet.tagName,
      //   }
      //   me.components.push(componentInfo);
      // Register the component globally so that it can be used in the template
      // Vue.component(me.snippet.tagName, MyComponent);
      // axios.get(me.snippet.url, {
      //   header:{
      //     'Access-Control-Allowed-Origin':'*'
      //   }
      // }).then(function (resp) {
      //   const component = import(resp.data)
      //                         .then((module) => {
      //                           // Use the imported module here
      //                           console.log(module);
      //                           customElements.define(me.snippet.tagName, module)
      //                         })
      //                           .catch(err=>console.log(err));
        // me.$createElement(me.snippet.tagName);
        // console.log(component)
        // const ExampleElement = defineCustomElement(resp.data)
        // customElements.define(me.snippet.tagName, ExampleElement)
        // Vue.component(me.snippet.tagName,resp.data);
        // const componentInfo = {
        //   component:Vue.component(me.snippet.tagName,resp.data),
        //   id: 'dynamic-componenet-'+me.snippet.tagName,
        //   key: 'dynamic-componenet-'+ 1,
        //   ref: 'dynamic-componenet-'+me.snippet.tagName,
        // }
        // me.components.push(componentInfo);
      // })
      me.dialog = false;
    }
  },
  created() {
    const me = this;
    this.src = localStorage["keditor.editing.content"]
    // const wc = import(me.snippet.url)
    //     .then((module) => {
    //           // Use the imported module here
    //       console.log(module);
    //         customElements.define(me.snippet.tagName, module)
    //     })
    //     .catch(err=>console.log(err));
    // console.log("component   ??!?!!?!??   ",wc);
  },
  mounted() {
    this.init();
  },
  watch: {
    top (val) {
      this.bottom = !val
    },
    right (val) {
      this.left = !val
    },
    bottom (val) {
      this.top = !val
    },
    left (val) {
      this.right = !val
    },
  },
  components: {
    "mash-up":Mashup,
    // "vue-test":import ('http://localhost:5004/vue-test.js')
  }
}
</script>

<style scoped>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>