// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

Vue.config.productionTip = false

// Counter 컴포넌트를 만듭니다
/*

  1) store 옵션을 제공함으로 루트의 모든 하위 컴포넌트에 주입을 한 경우

  this.$store.state.count;

  2) 전역 저장소 단독 항목에 의존하는 경우

  store.state.count;

*/
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
      // return this.$store.state.count;
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  components: { Counter },
  template:  `
    <div class="app">
      <counter></counter>
    </div>
  `
})
