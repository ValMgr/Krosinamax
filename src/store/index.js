import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bets: []
  },
  mutations: {
    addBet(state, bet){
      for(let i=0;i<state.bets.length;i++){
        if(state.bets[i].pseudo == bet.pseudo){
          state.bets.shift(i, i);
        }
      }
      state.bets.push(bet);

    },
    cleanBet(state){
      while(state.bets.length > 0){
        //console.log("Bet cleaned !")
        state.bets.pop(0)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
