<template>
    <div class="container vertical-center">
      <div id="app">
        <BetTable />
        <p>Nombre total de pari(s): {{ Bets.length }} </p>
      </div>
    </div>
</template>

<script>
import BetTable from './components/BetTable.vue';
import { mapState } from 'vuex';

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
</style>
