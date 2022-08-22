const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let position = {
	x: 200,
	y: 200,
};

io.on('connection', (socket) => {
	socket.emit('position', position);

	socket.on('move', (data) => {
		switch (data) {
			case 'left':
				position.x -= 5;
				io.emit('position', position);
				break;
			case 'right':
				position.x += 5;
				io.emit('position', position);
				break;
			case 'up':
				position.y -= 5;
				io.emit('position', position);
				break;
			case 'down':
				position.y += 5;
				io.emit('position', position);
				break;
		}
	});
	socket.on('moving', ({ x, y }) => {
		io.emit('movingPosition', { x, y });
	});
});

server.listen(3000, () => {
	console.log('Listening at :3000...');
});
