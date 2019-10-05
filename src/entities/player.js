const START_X = 40;
const START_Y = 80;
const SPEED = 32;
export const PLAYER_TILESET_KEY = 'chara';

export default class Player {
	constructor(scene) {
        this.sprite = scene.physics.add.sprite(START_X, START_Y, PLAYER_TILESET_KEY);
        this.createAnimations(scene);
        // this.__image.setInteractive();
        this.__cursorkeys = scene.input.keyboard.createCursorKeys();
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'horizontal',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 0, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'vertical',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 20, end: 39 }),
            frameRate: 10,
            repeat: -1
        });
    }

    _updateMovement() {
        const {left, right, up, down, space} = this.__cursorkeys;

        if (!(left.isDown || right.isDown)) {
            this.sprite.setVelocityX(0);
            this.sprite.anims.play('horizontal', true);
        }
        else {
            this.sprite.setVelocityX(left.isDown ? -SPEED : SPEED);
        }

        if (!(up.isDown || down.isDown)) {
            this.sprite.setVelocityY(0);
            this.sprite.anims.play('vertical', true);
        }
        else {
            this.sprite.setVelocityY(up.isDown ? -SPEED : SPEED);
        }

        if (space.isDown) {
            console.log('Interaction!')
        }
    }

    update() {
        this._updateMovement();
    }
}