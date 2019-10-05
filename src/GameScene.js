import { Scene } from 'phaser';
import mapJson from './assets/ship2.json';
import tiles from './assets/Tileset.png';
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
		this.physics.world.TILE_BIAS = 32;
		this.physics.world.OVERLAP_BIAS = 1; // we don't want to automatically resolve overlaps

		const map = this.make.tilemap({ key: 'map' });
		const tileset = map.addTilesetImage('Tileset', 'tiles');
		const walkableLayer = map.createStaticLayer('floor', tileset, 0, 0);
		const wallLayer = map.createStaticLayer('walls', tileset, 0, 0);
		wallLayer.setCollisionBetween(1, 999);

		this._player = new Player(this);
		this.physics.add.collider(this._player.sprite, wallLayer);
	}
	
	update(time, delta) {
		this._player.update();
	}
}