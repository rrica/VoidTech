export function preloadPipes() {
    this.load.spritesheet('blocking-assets',
        blockingAssets,
        { frameWidth: 16, frameHeight: 16 }
    );
}

export default class Pipes {
	constructor(scene, fromX, fromY, toX, toY) {
        this.sprite = scene.physics.add.sprite(fromX, fromX, PIPES_TILESET_KEY);
        this.sprite.setSize(16, 16);
        this.createAnimations(scene);
        this.cursorkeys = scene.input.keyboard.createCursorKeys();
        this.dialogs = scene.Dialog;
        this.scene = scene;
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'startHorizontalEmpty',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 0, end: 0 })
        });
        scene.anims.create({
            key: 'middleHorizontalEmpty',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 1, end: 1 })
        });
        scene.anims.create({
            key: 'endHorizontalEmpty',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 2, end: 2 })
        });
        scene.anims.create({
            key: 'startVerticalEmpty',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 3, end: 3 })
        });
        scene.anims.create({
            key: 'middleVerticalEmpty',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 4, end: 4 })
        });
        scene.anims.create({
            key: 'endVerticalEmpty',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 5, end: 5 })
        });
        scene.anims.create({
            key: 'startHorizontalFlowing',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 6, end: 7 }),
            frameRate: 1,
            repeat: -1
        });
        scene.anims.create({
            key: 'middleHorizontalFlowing',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 8, end: 9 }),
            frameRate: 1,
            repeat: -1
        });
        scene.anims.create({
            key: 'endHorizontalFlowing',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 10, end: 11 }),
            frameRate: 1,
            repeat: -1
        });
        scene.anims.create({
            key: 'startVerticalFlowing',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 12, end: 13 }),
            frameRate: 1,
            repeat: -1
        });
        scene.anims.create({
            key: 'middleVerticalFlowing',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 14, end: 15 }),
            frameRate: 1,
            repeat: -1
        });
        scene.anims.create({
            key: 'endVerticalFlowing',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 16, end: 17 }),
            frameRate: 1,
            repeat: -1
        });
    }
}
