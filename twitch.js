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

client.on('connected', (adress, port) => {
    client.say(channel, 'Hey this is a test');
});

client.on('chat', (channels, user, message, self) => {
    if(message === '!bet'){
        client.action(channel, 'You bet 2$');
    }
})