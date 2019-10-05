import dialogJson from './dialog.json';

class Dialog {
    init (dialogPlugin, scene, player) {
        this.dialogPlugin = dialogPlugin;
        this.scene = scene;
        this.player = player;
    }

    show(key) {
        this.dialogPlugin.show({ text: dialogJson[key].text });
    }
}

const SINGLETON = new Dialog();

export default SINGLETON;