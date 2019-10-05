import Phaser from 'phaser'

const BorderOpts = {
    thickness: 2,
    color: 0x907748,
    alpha: 1
};

const WindowOptions = {
    alpha: 1,
    height: 96,
    color: 0x303030,
    padding: 10,
    margin: 15
};

export class DialogPlugin extends Phaser.Plugins.ScenePlugin {

    constructor(scene, pluginManager) {
        super(scene, pluginManager);
        this.text = null;
    }

    // called when the plugin is loaded by PluginManager
    boot() {
        const events = this.scene.events;
        events.on('shutdown', this.shutdown, this);
        events.on('destroy', this.destroy, this);
        console.log("[Dialog Plugin] Initialized.");
    }

    shutdown() {

    }

    destroy() {
        this.shutdown();
        this.scene = null;
        console.log("[Dialog Plugin] Destroyed");
    }

    show({ borderOpts = {}, windowOpts = {}, text } = {}) {
        const currentBorder = {
            thickness: borderOpts.thickness || BorderOpts.thickness,
            color: borderOpts.color || BorderOpts.color,
            alpha: borderOpts.alpha || BorderOpts.alpha
        };
        const currentWindow = {
            alpha: windowOpts.alpha || WindowOptions.alpha,
            height: windowOpts.height || WindowOptions.height,
            color: windowOpts.color || WindowOptions.color,
            padding: windowOpts.padding || WindowOptions.padding,
            margin: windowOpts.margin || WindowOptions.margin
        };
        this.graphics = this.scene.add.graphics();
        this._createWindow(currentBorder, currentWindow);
        const textPosition = this._textPosition(currentWindow);
        this.text = this.scene.add.text(
            textPosition.x,
            textPosition.y,
            text,
            {
                wordWrap: { width: textPosition.width }
            }
        );
    }

    clear() {
        if (this.graphics) {
            this.graphics.clear();
        }
        if (this.text) {
            this.text.destroy();
        }
        this.text = null;
    }

    active() {
        return this.text !== null;
    }

    _textPosition(windowOpts) {
        const gameSize = this._gameSize();
        return {
            x: windowOpts.padding + windowOpts.margin,
            y: gameSize.height - windowOpts.height - windowOpts.padding + windowOpts.margin,
            width: gameSize.width - (windowOpts.padding * 2) + (windowOpts.margin * 2) 
        };
    }

    _gameSize() {
        const gameConfig = this.scene.sys.game.config;
        return { width: gameConfig.width, height: gameConfig.height };        
    }

    _dialogDimensions(borderOpts, windowOpts) {
        const gameSize = this._gameSize();
        const windowDims = {
            x: windowOpts.padding,
            y: gameSize.height - windowOpts.height - windowOpts.padding,
            width: gameSize.width - (windowOpts.padding * 2),
            height: windowOpts.height
        }
        const borderDims = windowDims;
        return {
            border: borderDims,
            window: windowDims
        }
    }

    _createWindow(borderOpts, windowOpts) {
        const { border, window } = this._dialogDimensions(borderOpts, windowOpts);

        // inner fill
        this.graphics.fillStyle(windowOpts.color, windowOpts.alpha);
        this.graphics.fillRect(window.x, window.y, window.width, window.height);

        // outer border rectangle
        this.graphics.lineStyle(borderOpts.thickness, borderOpts.color, borderOpts.alpha);
        this.graphics.strokeRect(border.x, border.y, border.width, border.height);
    }
}