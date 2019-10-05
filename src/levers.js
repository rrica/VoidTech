import dialog from './dialog/dialog.js';

const TILE_INDEX_DOOR_CLOSED = 37;
const TILE_INDEX_DOOR_OPENED = 38;

export default ({ doorLayer }) => {
    const toggleDoor = (x, y) => {
        const doorTile = doorLayer.getTileAt(x,y);
        if (doorTile.index === TILE_INDEX_DOOR_OPENED) {
            const tile = doorLayer.putTileAt(TILE_INDEX_DOOR_CLOSED, x, y);
            tile.setCollision(true);
        }
        else if (doorTile.index === TILE_INDEX_DOOR_CLOSED) {
            const tile = doorLayer.putTileAt(TILE_INDEX_DOOR_OPENED, x, y);
            tile.setCollision(false);
        }
        else {
            console.warn("Tried to use non-door tile as a door.")
        }
    };

    return {
        "lever-001": () => {
            console.log('lever 001 used');
            toggleDoor(9, 2);
        },
        "lever-002": () => {
            console.log('lever 002 used');
            toggleDoor(4, 11);
            toggleDoor(5, 11);
            dialog.show('speech-004');
        },
    }
}
