import Phaser from 'phaser';
import GameScene from './GameScene';

const config = {
	type: Phaser.AUTO,
	pixelArt: true,
	parent: 'canvas-parent',
	scale: {
		parent: 'phaser',
		mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
		width: 64,
		height: 64,
		max: {
			width: 640,
			height: 640
		}
	},
	physics: {
		default: 'arcade',
		arcade: { debug: true }
	},
	scene: [GameScene]
};

new Phaser.Game(config);