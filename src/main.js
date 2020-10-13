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
const channel = "Krose_Officiel";

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
        password: 'oauth:sauyug0zb4f1xelxksl9aila1jqwmj',
    },
    channels: [channel],
};

const client = new tmi.client(config);

client.connect();

client.on('connected', () => {
    //client.action(channel, 'Ping');
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
      console.log("Pseudo: " + pseudo + "; Score: " + score + '; MVP: ' + MVP)
      var newBet = {
          pseudo: pseudo,
          score: score,
          MVP: MVP,
      }
      
    if(!betManager.isEnd){
        store.commit("addBet", newBet)
        sendMessage(`@${pseudo}, votre pari à bien été pris en compte !`)
    }
    else{
        console.log('Bets is closed !')
        sendMessage(`@${pseudo}, les paris sont actuellement fermés !`)
    }

    }
})

exports.sendReward = (reward) => {
    for (const pseudo in reward) {
        setTimeout(() => {
            sendMessage(`!addpoints ${pseudo} ${reward[pseudo]}`)
        }, 3000);
    }
    
}

function sendMessage(msg){
    client.action(channel, msg)
}

export default exports