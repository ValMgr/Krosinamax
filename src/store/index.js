import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bets: [
      {pseudo: "ZartaK32", score: "1-0", MVP: "Keusno"},
      {pseudo: "Krose", score: "2-0", MVP: "Maybe"},
      {pseudo: "KHarden", score: "1-1", MVP: "Namkyo"},
      {pseudo: "Namkyo", score: "3-1", MVP: "Clarence"},
      {pseudo: "Keusno", score: "3-0", MVP: "Keusno"},
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
