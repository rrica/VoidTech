const START_X = 4;
const START_Y = 4;
const SPEED = 16;

export default class Player {
	constructor(scene) {
        // An Arcade Physics Image is an Image with an Arcade Physics body and related components.
        this.arcadeImage = scene.physics.add.image(START_X, START_Y, 'chara');
        // this.__image.setInteractive();
        this.__cursorkeys = scene.input.keyboard.createCursorKeys();
    }

    _updateMovement() {
        const {left, right, up, down, space} = this.__cursorkeys;

        if (!(left.isDown || right.isDown)) {
            this.arcadeImage.setVelocityX(0);
        }
        else {
            this.arcadeImage.setVelocityX(left.isDown ? -SPEED : SPEED);
        }

        if (!(up.isDown || down.isDown)) {
            this.arcadeImage.setVelocityY(0);
        }
        else {
            this.arcadeImage.setVelocityY(up.isDown ? -SPEED : SPEED);
        }

        if (space.isDown) {
            console.log('Interaction!')
        }
    }

    update() {
        this._updateMovement();
    }
}