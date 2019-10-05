const START_X = 40;
const START_Y = 80;
const SPEED = 40;
export const PLAYER_TILESET_KEY = 'chara';
import Phaser from 'phaser';
import dialog from '../dialog/dialog.js';

export default class Player {
	constructor(scene) {
        this.sprite = scene.physics.add.sprite(START_X, START_Y, PLAYER_TILESET_KEY);
        this.sprite.setSize(16, 16);
        this.createAnimations(scene);
        this.__cursorkeys = scene.input.keyboard.createCursorKeys();
        this.dialogs = scene.Dialog;
        this.scene = scene;
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

        if (Phaser.Input.Keyboard.JustDown(space)) {
            if (this.dialogs.active()) {
                this.dialogs.clear();
            }
            else {
                this.scene.physics.overlap(this.sprite, this.scene.objects, (left, right) => {
                    const trigger = left === this.sprite ? right : left;
                    dialog.show(trigger.getData('action'));
                });
            }
        }
    }

    _updateAnimation() {
        if (this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0) {
            this.sprite.anims.play('walking', true);

            // rotate sprite according to body and correct different rotation systems
            this.sprite.rotation = this.sprite.body.angle + Math.PI / 2;
        }
        else {
            this.sprite.anims.play('standing', true);
        }
    }

    update() {
        this._updateMovement();
        this._updateAnimation();
    }
}