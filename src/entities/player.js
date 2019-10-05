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
            key: 'walking',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'standing',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });
    }

    _updateMovement() {
        const {left, right, up, down, space} = this.__cursorkeys;

        if (!(left.isDown || right.isDown)) {
            this.sprite.setVelocityX(0);
        }
        else {
            this.sprite.setVelocityX(left.isDown ? -SPEED : SPEED);
        }

        if (!(up.isDown || down.isDown)) {
            this.sprite.setVelocityY(0);
        }
        else {
            this.sprite.setVelocityY(up.isDown ? -SPEED : SPEED);
        }

        if (space.isDown) {
            console.log('Interaction!')
        }
    }

    _updateAnimation() {
        if (this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0) {
            // we are moving!
            this.sprite.anims.play('walking', true);
        }
        else {
            this.sprite.anims.play('standing', true);
        }
        // rotate sprite according to body and correct different rotation systems
        this.sprite.rotation = this.sprite.body.angle + Math.PI / 2;
    }

    update() {
        this._updateMovement();
        this._updateAnimation();
    }
}