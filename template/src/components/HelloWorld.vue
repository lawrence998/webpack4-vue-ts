<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    <h2>vue-typescrip-starter</h2>
    <p>mixin 数据 ：\{{ testMixinArg }}</p>
    {{#vuex}}
    <p>store 数据 ：\{{ info.data }}</p>
    {{/vuex}}
    <RC></RC>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import RC from '@/components/renderComponent.vue'
import TestMixin from '../mixins/test-mixin'
{{#vuex}}
import { Getter } from 'vuex-class'
{{/vuex}}

{{#mockjs}}
import {login} from "../service/getData";
{{/mockjs}}

@Component({
  components: {
    RC
  },
  mixins: [TestMixin]
})
export default class HelloWorld extends Vue<TestMixin> {
  {{#vuex}}
  @Getter info
  {{/vuex}}
  msg: string = 'Welcome to Your Vue-Typescript App'

  mounted () {
    console.log('这是 _.assign({})', _.assign({}))
    console.log('from mixin', this.testMixinArg)
    console.log('vuex-info', this.info);
  }

  {{#mockjs}}
  async created() {
    const res = await login();
    console.log('mock-res: ', res);
  }
  {{/mockjs}}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
