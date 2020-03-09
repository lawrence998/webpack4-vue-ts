import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router'

const HelloWorld: AsyncComponent = (): any => import('@/components/HelloWorld.vue');
const renderComponent: AsyncComponent = (): any => import('@/components/renderComponent.vue');
{{#vueListView}}
const vueList: AsyncComponent = (): any => import('@/components/vueList.vue');
{{/vueListView}}

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {{#vueListView}}
  {
    path: '/vueList',
    name: 'vueList',
    component: vueList
  },
  {{/vueListView}}
  {
    path: '/renderComponent',
    name: 'renderComponent',
    component: renderComponent
  }
]

const router: Router = new Router({
  // mode: 'history',
  base: '/',
  routes
})

export default router
