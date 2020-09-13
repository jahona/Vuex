// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex, { mapState } from 'vuex'

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
  template: `
    <div>
      <div>
        count: {{ count }}
      </div>
      <div>
        countPlusLocalState: {{ countPlusLocalState }}
      </div>
    </div>
  `,
  data() {
    return {
      localCount: 10
    }
  },
  /*
    mapState 를 통해 계산된 getter 함수를 생성하여 키 입력을 줄일 수 있다.
  */
  computed: mapState({
    /*
      count(state) { return state.count; } 를 의미 
    */
    count: state => state.count,

    /*
      this 를 사용하여 로컬 상태에 접근할려면 일반 함수를 생성해서 사용해야 한다.
    */
    countPlusLocalState(state) {
      return state.count + this.localCount
    }
  })

  /*
  매핑된 계산된 속성의 이름이 상태 하위 트리와 같을때, 문자열 배열을 mapState 에 전달 가능
  */
  // computed: mapState([
  //   'count'
  // ])
  
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { Counter },
  template:  `
    <div class="app">
      <counter></counter>
    </div>
  `
})
