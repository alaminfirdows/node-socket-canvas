<template>
	<div>
		<canvas
			ref="game"
			width="640"
			height="480"
			style="border: 1px solid black;"
			@mousemove="getCordinate"
		></canvas>
		<p>
			<button v-on:click="move('right')">Right</button>
			<button v-on:click="move('left')">Left</button>
			<button v-on:click="move('up')">Up</button>
			<button v-on:click="move('down')">Down</button>
		</p>
	</div>
</template>

<script>
import io from 'socket.io-client';
export default {
	name: 'BlockGame',
	data() {
		return {
			socket: {},
			context: {},
			position: {
				x: 0,
				y: 0,
			},
		};
	},
	created() {
		this.socket = io('http://localhost:3000');
	},
	mounted() {
		this.context = this.$refs.game.getContext('2d');
		this.socket.on('position', (data) => {
			this.position = data;
			this.context.clearRect(
				0,
				0,
				this.$refs.game.width,
				this.$refs.game.height
			);
			this.context.fillStyle = '#FFFFFF';
			this.context.fillRect(
				0,
				0,
				this.$refs.game.width,
				this.$refs.game.width
			);
			this.context.fillStyle = '#000000';
			this.context.fillRect(this.position.x, this.position.y, 20, 20);
		});
		this.socket.on('movingPosition', ({ x, y }) => {
			// this.context.clearRect(
			// 	0,
			// 	0,
			// 	this.$refs.game.width,
			// 	this.$refs.game.height
			// );
			// this.context.fillStyle = '#FFFFFF';
			// this.context.fillRect(
			// 	0,
			// 	0,
			// 	this.$refs.game.width,
			// 	this.$refs.game.width
			// );
			this.context.fillStyle = '#000000';
			this.context.fillRect(x, y, 20, 20);
		});
	},
	methods: {
		move(direction) {
			this.socket.emit('move', direction);
		},
		getCordinate() {
			let rect = this.$refs.game.getBoundingClientRect();
			let x = event.clientX - rect.left;
			let y = event.clientY - rect.top;
			// console.log('Coordinate x: ' + x, 'Coordinate y: ' + y);
			this.socket.emit('moving', { x, y });
		},
	},
};
</script>

<style scoped></style>
