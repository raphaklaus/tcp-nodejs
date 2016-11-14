const net = require('net'),
  readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var socket, connected = false;

function openConnection() {
  socket = net.createConnection({port: 1234}, () => {
    connected = true;
    console.log('Connected to server');

    socket.on('data', data => {
      console.log(`${data.toString()}`);
    });
  });

  socket.on('error', () => {
    connected = false;
    console.log('Lost connection with server. ' +
    'Type enter to retry connection');
    socket.destroy();
    socket.unref();
  });
}

rl.on('line', input => {
  if (!connected) {
    openConnection();
  } else
    socket.write(`Client said: ${input}`);
});

openConnection();
