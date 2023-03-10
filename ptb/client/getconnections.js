const WebSocket = require('websocket').server;
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Received HTTP request');
  res.writeHead(404);
  res.end();
});

server.listen(3000, () => {
  console.log('WebSocket server listening on port 3000');
});

const wsServer = new WebSocket({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', (request) => {
  if (request.httpRequest.url !== '/DiscordPtbDevClient') {
    request.reject();
    console.log('Rejected connection from ' + request.remoteAddress);
    return;
  }
  
  const connection = request.accept('echo-protocol', request.origin);
  
  console.log('WebSocket client connected');
  
  connection.on('message', (message) => {
    console.log(`Received message: ${message.utf8Data}`);
    connection.sendUTF(`Echo: ${message.utf8Data}`);
  });
  
  connection.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});
