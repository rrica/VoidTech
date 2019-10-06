const START_X = 550;
const START_Y = 180;
const SPEED = 40;
export const PLAYER_TILESET_KEY = 'chara';
import Phaser from 'phaser';
import dialog from '../dialog/dialog.js';
import { getTiledIdFromPhaserTileIndex } from '../dynamic-tilemap-layer-helper.js';

const TILED_TILE_ID_METAL_FLOOR = 39;
const TILED_TILE_ID_WOOD_FLOOR = 38;

export default class Player {
	constructor(scene) {
        this.sprite = scene.physics.add.sprite(START_X, START_Y, PLAYER_TILESET_KEY);
        this.sprite.setSize(16, 16);
        this.createAnimations(scene);
        this.cursorkeys = scene.input.keyboard.createCursorKeys();
        this.dialogs = scene.Dialog;
        this.scene = scene;
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'walking',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        scene.anims.create({
            key: 'standing',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });
    }

    // _updateMovement() {
    //     const {left, right, up, down, space} = this.cursorkeys;

    //     if (!(left.isDown || right.isDown)) {
    //         this.sprite.setVelocityX(0);
    //     }
    //     else {
    //         this.sprite.setVelocityX(left.isDown ? -SPEED : SPEED);
    //     }

    //     if (!(up.isDown || down.isDown)) {
    //         this.sprite.setVelocityY(0);
    //     }
    //     else {
    //         this.sprite.setVelocityY(up.isDown ? -SPEED : SPEED);
    //     }

    //     if (Phaser.Input.Keyboard.JustDown(space)) {
    //         if (dialog.active) {
    //             dialog.hide();
    //         }
    //         else {
    //             this.scene.physics.overlap(this.sprite, this.scene.objects, (left, right) => {
    //                 const trigger = left === this.sprite ? right : left;
    //                 dialog.show(trigger.getData('action'));
    //             });
    //         }
    //     }
    // }

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

    _isMoving(velocity) {
        return velocity.x != 0 || velocity.y != 0;
    }

    _updateWalkingSound() {
        const walkingOnWoodSound = this.scene.sounds.walkingWood2;
        const walkingOnMetalSound = this.scene.sounds.walkingMetal1;

        const tileStandingOn = this.scene.walkableLayer.getTileAtWorldXY(this.sprite.x, this.sprite.y);
        const tileCurrentlyStandingOnId = getTiledIdFromPhaserTileIndex(this.scene.walkableLayer, tileStandingOn.index);
        const currentFloorType = this._getFloorType(tileCurrentlyStandingOnId);

        if (!this._isMoving(this.sprite.body.velocity)) {
            walkingOnWoodSound.stop();
            walkingOnMetalSound.stop();
        }
        else {
            if (currentFloorType === 'metal') {
                if (walkingOnWoodSound.isPlaying) {
                    walkingOnWoodSound.stop();
                }
                if (!walkingOnMetalSound.isPlaying) {
                    walkingOnMetalSound.play({loop: false});
                }
            }
            else {
                if (walkingOnMetalSound.isPlaying) {
                    walkingOnMetalSound.stop();
                }
                if (!walkingOnWoodSound.isPlaying) {
                    walkingOnWoodSound.play({loop: false});
                }
            }
        }
    }

    _getFloorType(tileId) {
        if (tileId === TILED_TILE_ID_METAL_FLOOR) {
            return 'metal';
        }
        else {
            return 'wood';
        }
    }

    update() {
        // this._updateMovement();
        this._updateAnimation();
    }
}