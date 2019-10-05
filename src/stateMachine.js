import dialog from './dialog/dialog.js';
import constants from './constants.js';

const STATES = {
    normal: 'normal',
    dialog: 'dialog'
};

Object.freeze(STATES);

export { STATES }; 

class StateMachine {
    init (player) {
        this.player = player;
        this.state = STATES.normal;
    }

    setState(state) {
        this.state = state;
    }

    update() {
        switch (this.state) {
            case STATES.normal:
                this.updateMovement();
                break;
            case STATES.dialog:
                this.updateDialog();
        }
    }

    updateMovement() {
        const { left, right, up, down, space } = this.player.cursorkeys;
        if (!(left.isDown || right.isDown)) {
            this.player.sprite.setVelocityX(0);
        }
        else {
            this.player.sprite.setVelocityX(left.isDown ? -constants.speed : constants.speed);
        }

        if (!(up.isDown || down.isDown)) {
            this.player.sprite.setVelocityY(0);
        }
        else {
            this.player.sprite.setVelocityY(up.isDown ? -constants.speed : constants.speed);
        }

        if (Phaser.Input.Keyboard.JustDown(space)) {
            this.player.scene.physics.overlap(this.player.sprite, this.player.scene.objects, (left, right) => {
                const trigger = left === this.player.sprite ? right : left;
                dialog.show(trigger.getData('action'));
            });
        }
    }

    updateDialog() {
        const { space } = this.player.cursorkeys;
        if (Phaser.Input.Keyboard.JustDown(space)) {
            if (dialog.active) {
                dialog.hide();
                this.setState(STATES.normal);
            }
        }
    }
}

const SINGLETON = new StateMachine();

export default SINGLETON;