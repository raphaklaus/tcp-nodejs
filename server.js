const net = require('net'),
  readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Hi Sr. Server! Waiting client...');

var server = net.createServer(socket => {
  console.log('A client is on!');
  socket.write('Welcome dear client! Lets chat!\n');

  socket.on('data', data => {
    console.log(data.toString());
    // socket.end();
  });

  socket.on('error', () => {
    console.log('Oops, the client closed connection');
  });

  rl.on('line', input => {
    socket.write(`Server said: ${input}`);
  });
});

server.listen('1234');
