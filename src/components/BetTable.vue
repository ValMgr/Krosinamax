<template>
  <table class="table table-dark">
      <thead>
          <tr>
              <th scope="col">#</th>
              <th scope="col">Pseudo</th>
              <th scope="col">Score</th>
              <th scope="col">MVP</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(bet, index) in Bets" :key="bet.pseudo">
              <td scope="col" >{{index+1}}</td>
              <td scope="col" >{{bet.pseudo}}</td>
              <td scope="col" >{{bet.score}}</td>
              <td scope="col" >{{bet.MVP}}</td>
          </tr>
      </tbody>
  </table>
  
            
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BetTable',
  computed: {
        ...mapState({
            Bets: "bets",
        })
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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
