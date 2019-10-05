import dialogJson from './dialog.json';
import stateMachine from '../stateMachine.js';
import { STATES } from '../stateMachine.js';

class Dialog {
    init (dialogPlugin, scene, player) {
        this.dialogPlugin = dialogPlugin;
        this.scene = scene;
        this.player = player;
        this.dialogContainer = document.getElementById('dialog');
        this.dialogText = document.getElementById('text');
        this.buttonTemplate = document.getElementById('dialog-button');
    }

    show(key) {
        this.dialogContainer.style.display = 'block';
        this.dialogText.innerHTML = dialogJson[key].text;
        stateMachine.setState(STATES.dialog);
    }

    hide() {
        this.dialogContainer.style.display = 'none';
    }

    get active() {
        return this.dialogContainer.style.display === 'block';
    }
}

const SINGLETON = new Dialog();

export default SINGLETON;