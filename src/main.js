import Vue from 'vue'
import App from './App.vue'
import store from './store'

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

// client.on('connected', () => {
//     client.action(channel, 'Krosinamax now up !');
// });

// client.on('chat', (channels, user, message) => {
//       client.action(channel, message);
// })