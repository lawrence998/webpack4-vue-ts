{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
import Component from 'vue-class-component';
{{#router}}
import router from './router'
{{/router}}
{{#router}}
import store from './store'
{{/router}}

{{#elementUI}}
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
{{/elementUI}}

{{#vueListView}}
import Listview from '@laomao800/vue-listview'
{{/vueListView}}


Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

{{#mockjs}}
if (process.env.NODE_ENV === 'development') {
  import ('./assets/mock')
}
{{/mockjs}}

{{#elementUI}}
Vue.use(ElementUI);
{{/elementUI}}
{{#vueListView}}
Vue.use(Listview);
{{/vueListView}}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})