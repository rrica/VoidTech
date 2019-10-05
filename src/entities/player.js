const START_X = 4;
const START_Y = 4;
const SPEED = 16;

export default class Player {
	constructor(scene) {
        this.__image = scene.physics.add.image(START_X, START_Y, 'chara');
        // this.__image.setInteractive();
        this.__cursorkeys = scene.input.keyboard.createCursorKeys();
    }

    _updateMovement() {
        const {left, right, up, down} = this.__cursorkeys;

        if (!(left.isDown || right.isDown)) {
            this.__image.setVelocityX(0);
        }
        else {
            this.__image.setVelocityX(left.isDown ? -SPEED : SPEED);
        }

        if (!(up.isDown || down.isDown)) {
            this.__image.setVelocityY(0);
        }
        else {
            this.__image.setVelocityY(up.isDown ? -SPEED : SPEED);
        }
    }

    update() {
        this._updateMovement();
    }
}