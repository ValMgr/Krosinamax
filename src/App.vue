<template>
    <div class="container vertical-center">
      <div id="app">
        <BetTable />
        <p>Nombre total de pari(s): {{ Bets.length }} </p>
        <hr>

        <form>
          <label>Score: </label>
          <input id="score1" type="number" class="scoreInput" min="0" value="0"> - <input id="score2" type="number" class="scoreInput" min="0" value="0">
          <br>
          <label>MVP: </label>
          <input type="text" id="MVPInput" placeholder="...">
          <br>
          <span id="error">Veuillez renseigner un MVP ...</span>
        </form>
        <br>
        <div id="betState"><span id="StateIndicator"></span><p id="countdown">Paris fermé</p></div>
        <button id="endMatchBtn" class="btn btn-danger" v-on:click="clearBets()">Fin de match</button>
        <button id="endBetBtn" class="btn btn-success  " v-on:click="StopCountdown()">Fermé les paris</button>
        <button id="newBtn" class="btn btn-primary" v-on:click="newMatch()">Nouveau match</button>


      </div>
    </div>
</template>

<script>
import BetTable from './components/BetTable.vue';
import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import store from './store'
import betManager from './functions/betManager.js'
import client from './main.js'

export default {
  name: 'App',
  components: {
    BetTable
  },
  computed: {
        ...mapState({
            Bets: "bets",
        })
  },
  methods: {
      ...mapMutations({
        clean: 'cleanBet',
        addBet: 'addBet',
      }),
      clearBets: () => {
        let MVP = document.getElementById('MVPInput').value
          if(MVP == ""){
            document.getElementById('error').style.visibility = 'visible';
            //console.log("MVP cannot be unset");
          }
          else{
            document.getElementById('error').style.visibility = 'hidden';
            document.getElementById('endMatchBtn').style.display = 'none';
            document.getElementById('newBtn').style.display = 'block';

            let score = document.getElementById('score1').value + "-" + document.getElementById('score2').value
            //console.log("Score: " + score)
            //console.log("MVP: " + MVP)
            document.getElementById('MVPInput').value = ""
            document.getElementsByClassName('scoreInput')[0].value = '0'
            document.getElementsByClassName('scoreInput')[1].value = '0'
            betManager.endMatch(score, MVP);
          }
      },
      newMatch: () => {
          betManager.StartCountdown(180);
          document.getElementById('endBetBtn').style.display = 'block';
          document.getElementById('newBtn').style.display = 'none';
          client.sendMessage("Le match va commencer ! Faites vos paris avec la command !bet")
          client.sendMessage("Syntax: !bet 0-0 Pseudo")
      },
      StopCountdown: () => {
        betManager.StopCountdown();
      }
  } 
}

 function endBets(){
          document.getElementById('endMatchBtn').style.display = 'block';
          document.getElementById('endBetBtn').style.display = 'none';
          client.sendMessage("Les paris sont désormais fermés !")
  }

  export {endBets}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #bbbbbb;
  margin-top: 60px;
}
input{
  margin: 5px;
}
.scoreInput{
  width: 50px;
}
hr{
  border-top: 1px solid #FFF;
}
#StateIndicator{
  width: 10px;
  height: 10px;
  display: inline-block;
  background-color: red;
  border-radius: 50%;
  }
#countdown{
  display: inline-block;
  margin-left: 5px;
}
.btn{
  margin-right: 5px;
}
#error{
  color: red;
  visibility: hidden;
}
#endMatchBtn, #endBetBtn{
  display: none;
}
</style>
