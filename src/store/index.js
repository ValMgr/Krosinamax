import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bets: [
      {pseudo: "oui", score: "1-0", MVP: "Keusno"},
      {pseudo: "non", score: "2-0", MVP: "Keusno"},
      {pseudo: "aya", score: "1-1", MVP: "Namkyo"},
      {pseudo: "ghjk", score: "3-1", MVP: "Clarence"},
      {pseudo: "samerelapute", score: "3-0", MVP: "Keusno"},
    ]
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
