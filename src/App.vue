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
        <button id="endBtn" class="btn btn-success" v-on:click="clearBets()">Fin de match</button>
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
      clearBets: function(){
        let MVP = document.getElementById('MVPInput').value
          if(MVP == ""){
            document.getElementById('error').style.visibility = 'visible';
            console.log("MVP cannot be unset");
          }
          else{
            document.getElementById('error').style.visibility = 'hidden';
            document.getElementById('endBtn').style.display = 'none';
            document.getElementById('newBtn').style.display = 'block';

            let score = document.getElementById('score1').value + "-" + document.getElementById('score2').value
            console.log("Score: " + score)
            console.log("MVP: " + MVP)
            document.getElementById('MVPInput').value = ""
            document.getElementsByClassName('scoreInput')[0].value = '0'
            document.getElementsByClassName('scoreInput')[1].value = '0'
            betManager.endMatch(score, MVP);
          }
      },
      newMatch: function(){
          betManager.StartCountdown(180);
          document.getElementById('endBtn').style.display = 'block';
          document.getElementById('newBtn').style.display = 'none';

      }
  } 
}

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
#endBtn{
  display: none;
}
</style>
