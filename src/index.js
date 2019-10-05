import Phaser from 'phaser';
import GameScene from './GameScene';

const config = {
	type: Phaser.AUTO,
	pixelArt: true,
	parent: 'canvas-parent',
	physics: {
		default: 'arcade',
		arcade: { debug: true }
	},
	scene: [GameScene]
};

new Phaser.Game(config);