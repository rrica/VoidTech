import { Scene } from 'phaser';
import mapJson from './assets/map.json';
import tiles from './assets/brick-sheet.png';
import chara from './assets/textures.png'

export default class GameScene extends Scene {
	constructor() {
		super({ key: GameScene.KEY });
		
		this._count = 0;
	}
	
	static get KEY() {
		return 'game-scene'
	}

	preload() {
		this.load.image('tiles', tiles);
		this.load.tilemapTiledJSON('map', mapJson);
		this.load.spritesheet('chara',
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


		this._drops = this.physics.add.group();
		const player = this.physics.add.image(4, 4, 'chara');
		player.setInteractive();
		
		this.input.setDraggable(player);
		this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
			gameObject.x = dragX;
			gameObject.y = dragY;
		});
	}
	
	update(time, delta) {
		this._count += delta;
		if (this._count > 800) {
			this._drops.create(Math.floor(Math.random() * 800) + 100, 50).setVelocityY(300);
			this._count -= 800;
		}
	}
}