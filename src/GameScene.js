import { Scene } from 'phaser';
import mapJson from './assets/map.json';
import tiles from './assets/brick-sheet.png';
import chara from './assets/textures.png'
import { PLAYER_TILESET_KEY } from './entities/player.js';
import Player from './entities/player.js';

export default class GameScene extends Scene {
	constructor() {
		super({ key: GameScene.KEY });
	}
	
	static get KEY() {
		return 'game-scene'
	}

	preload() {
		this.load.image('tiles', tiles);
		this.load.tilemapTiledJSON('map', mapJson);
		this.load.spritesheet(PLAYER_TILESET_KEY,
			chara,
			{ frameWidth: 8, frameHeight: 8 }
		);
	}
	
	create() {
		this.physics.world.TILE_BIAS = 8; // tilemap tiles are 8x8, default bias is for 16x16 and breaks collision
		this.physics.world.OVERLAP_BIAS = 1; // we don't want to automatically resolve overlaps

		const map = this.make.tilemap({ key: 'map' });
		const tileset = map.addTilesetImage('brick-sheet', 'tiles');
		const undestructibleLayer = map.createStaticLayer('undestructible', tileset, 0, 0);
		undestructibleLayer.setCollisionByProperty({ collision: true });

		this._player = new Player(this);
		this.physics.add.collider(this._player.sprite, undestructibleLayer);
	}
	
	update(time, delta) {
		this._player.update();
	}
}