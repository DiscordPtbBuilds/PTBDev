const WebSocket = require('websocket').client;

const socket = new WebSocket();

socket.on('connect', (connection) => {
  console.log('WebSocket connected');
  
  connection.on('message', (message) => {
    console.log(`Received message: ${message.utf8Data}`);
  });

  connection.send('Server has established a new instance: localhost');
});

socket.on('close', () => {
  console.log('WebSocket Faliure: Disconnected');
});

socket.connect('ws://localhost:3000', 'DiscordPtbDevClient');
