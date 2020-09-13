// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex, { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

Vue.use(Vuex)

const moduleA = {
  
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    increment2 (state, n) {
      state.count += n
    },
    increment3 (state, n) {
      state.count += n
    }
  },
  getters: {
    getCount_added100: (state) => {
      return state.count + 100;
    },
    getCount_added1000: (state, getters) => {
      return getters.getCount_added100 + 1000;
    },

    /*
      computed 는 캐시 기능을 제공하지만, 
      메서드를 통한 getter 는 호출될때마다 캐시가 되지 않는다.
    */
    getCountFn: (state) => () => {
      return state.count + 1;
    }
  },
  actions: {
    increment(context) {
      var rn = Math.random();
      context.commit('increment2', Math.floor(rn * 10 + 1));
    },
    increment2({ commit }, n) {
      commit('increment2', n);
      commit('increment2', n);
    },
    incrementAsync({ commit }, n) {
      setTimeout(() => {
        commit('increment2', n)
      }, 1000)
    },

    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // mutation 호출
          commit('increment');
          resolve();
        }, 1000)
      })
    },
    actionB ({ commit }) {
      return this.dispatch('actionA').then(() => {
        commit('increment2', 1000);
      })
    }
  }
}

const store = new Vuex.Store({
  modules: {
    moduleA: moduleA
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
        getCount_added100: {{ getCount_added100 }}
      </div>
      <div>
        getCount_added1000: {{ getCount_added1000 }}
      </div>
      <div>
        getCountFn: {{ getCountFn() }}
      </div>
      <button @click="increment">increment</button>
      <button @click="add(10)">add(10)</button>
      <button @click="add2(100)">add2(100)</button>
      <button @click="add_random()">add_random()</button>
      <button @click="add_2x(100)">add_2x(100)</button>
      <button @click="incrementAsync(1)">incrementAsync</button>
      <button @click="actionA()">actionA()</button>
      <button @click="actionB()">actionB()</button>
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
  computed: {
    /*
      객체 전개 연산자를 통해 mapState 와 mapGetters 를 최종 객체로 하여 computed 에 전달할 수 있다.
    */
    ...mapState({
      /*
        count(state) { return state.count; } 를 의미 

        state 에 접근할때는 전역 네임스페이스 아래에 등록되었어도 모듈 경로로 구분해줘야 한다.
      */
      count: state => state.moduleA.count,
  
      /*
        this 를 사용하여 로컬 상태에 접근할려면 일반 함수를 생성해서 사용해야 한다.
      */
      countPlusLocalState(state) {
        return state.count + this.localCount
      },
    }),
    ...mapGetters([
      'getCount_added100',
      'getCount_added1000',
      'getCountFn',
    ])
  },
  methods: {
    /*
      this.$store.commit('xxx') 를 통해 Mutation 를 호출하거나,
      mapMutations 헬퍼 함수를 이용하여 store.commit 호출에 매핑시킬 수 있다.(루트 store에 주입 필요)
    */
    ...mapMutations([
      'increment'
    ]),
    ...mapMutations({
      add: 'increment2'
    }),
    add2(n) {
      this.$store.commit('increment3', n);
    },
    /*
      this.$store.dispatch('xxx') 를 통해 action 을 호출하거나,
      mapActions 헬퍼 함수를 이용하여 store.dispatch 호출에 매핑시킬 수 있다.
    */
    ...mapActions({
      add_random: 'increment',
      add_2x: 'increment2',
      incrementAsync: 'incrementAsync'
    }),
    ...mapActions({
      actionA: 'actionA',
      actionB: 'actionB'
    })
  }
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
