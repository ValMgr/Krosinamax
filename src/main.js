import Vue from 'vue'
import App from './App.vue'
import store from './store'
import betManager from './functions/betManager.js'

let exports = {}

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')


const tmi = require('tmi.js');
const channel = "ZartaK32_Dev";

const config = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: 'Krosinamax',
        password: 'oauth:nu8yo5w38fcj06lfthbzc2q9c8u19e',
    },
    channels: [channel],
};

const client = new tmi.client(config);

client.connect();

client.on('connected', () => {
    //client.action(channel, 'Krosinamax now up !');
});

client.on('chat', (channels, user, message) => {
    var command = message.split(" ")[0]    
    if(command == "!bet"){
        var score;
        var MVP;
        var pseudo = user.username

        if(message.split("")[2] == '-'){
            score = message.split(" ")[1] + "-" + message.split(" ")[3];
            MVP = message.split(" ")[4];
        }
        else{
            score = message.split(" ")[1];
            MVP = message.split(" ")[2]
        }
      //console.log("Pseudo: " + pseudo + "; Score: " + score + '; MVP: ' + MVP)
      var newBet = {
          pseudo: pseudo,
          score: score,
          MVP: MVP,
      }
      betManager.sendBet(newBet);
    }
})

exports.sendReward = (reward) => {
    console.log(reward)
    for (const pseudo in reward) {
       client.action(channel, `!addpoints ${pseudo} ${reward[pseudo]}`)
    }
}

export default exports