const PIPE_STATES = {
    empty: 'empty', 
    active: 'active'
}

class Pipe {

    constructor() {
        this.state = PIPE_STATES.empty;
    }

    setState(state) {
        this.state = state;
    }

    update(position, direction) {
    }

}

export class VerticalPipe extends Pipe {

	constructor (x, yStart, yEnd) {
        super();
        this.x = x;
        this.yStart = yStart;
        this.yEnd = yEnd;
	}
}

export class HorizontalPipe extends Pipe {

	constructor (xStart, xEnd, y) {
        super();
        this.xStart = xStart;
        this.xEnd = xEnd;
        this.y = y;
	}

    update() { 
        const blockingLayer = stateMachine.player.scene.blockingLayer;
        if (state === PIPE_STATES.active) {
            var tile = blockingLayer.getTileAt(x,y);
        }
    }

}