import dialog from './dialog/dialog.js';
import constants from './constants.js';
import levers from './levers.js';

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
        this.leverLogic = levers({ doorLayer: this.player.scene.doorLayer });
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
            this.player.scene.physics.overlap(this.player.sprite, this.player.scene.speechTriggers, (left, right) => {
                const trigger = left === this.player.sprite ? right : left;
                dialog.show(trigger.getData('action'));
            });
            this.player.scene.physics.overlap(this.player.sprite, this.player.scene.levers, (left, right) => {
                const trigger = left === this.player.sprite ? right : left;
                this.leverLogic[trigger.getData('action')]();
            });
        }
    }

    updateDialog() {
        this.player.sprite.setVelocityX(0);
        this.player.sprite.setVelocityY(0);
        const { up, down, space } = this.player.cursorkeys;
        if (dialog.menu) {
            if (Phaser.Input.Keyboard.JustDown(down) && document.activeElement.nextElementSibling) {
                document.activeElement.nextElementSibling.focus();
            }
            if (Phaser.Input.Keyboard.JustDown(up) && document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling.focus();
            }
        }
        else {
            if (Phaser.Input.Keyboard.JustDown(space)) {
                dialog.hide();
                this.setState(STATES.normal);
            }
        }
    }
}

const SINGLETON = new StateMachine();

export default SINGLETON;