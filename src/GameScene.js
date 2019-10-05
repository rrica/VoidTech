import { Scene } from 'phaser';

export default class GameScene extends Scene {
	constructor() {
		super({ key: GameScene.KEY });
		
		this._count = 0;
	}
	
	static get KEY() {
		return 'game-scene'
	}
	
	create() {
		this._drops = this.physics.add.group();
		this._player = this.physics.add.image(500, 600);
		this._player.setInteractive();
		
		this.physics.add.overlap(this._player, this._drops,
			(...args) => args.filter(arg => arg !== this._player).forEach(arg => arg.destroy())
		);
		
		
		this.input.setDraggable(this._player);
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