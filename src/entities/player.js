const START_X = 4;
const START_Y = 4;

export default class Player {
	constructor(scene) {
        this.__image = scene.physics.add.image(START_X, START_Y, 'chara');
        this.__image.setInteractive();
        this.initMouseDragMovement(scene);
    }

    initMouseDragMovement(scene) {
        scene.input.setDraggable(this.__image);
		scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
			gameObject.x = dragX;
			gameObject.y = dragY;
		});
    }
}