import stateMachine from './stateMachine.js';
import { getPhaserTileIndexFromTiledGid } from './dynamic-tilemap-layer-helper.js';

const TILED_TILE_ID_DOOR_CLOSED = 0;
const TILED_TILE_ID_DOOR_OPENED = 1;

export function toggleDoor(x, y) {
    const doorLayer = stateMachine.player.scene.doorLayer;

    const tileIndexDoorClosed = getPhaserTileIndexFromTiledGid(doorLayer, TILED_TILE_ID_DOOR_CLOSED);
    const tileIndexDoorOpened = getPhaserTileIndexFromTiledGid(doorLayer, TILED_TILE_ID_DOOR_OPENED);

    const doorTile = doorLayer.getTileAt(x,y);
    if (doorTile.index === tileIndexDoorOpened) {
        const tile = doorLayer.putTileAt(tileIndexDoorClosed, x, y);
        tile.setCollision(true);
    }
    else if (doorTile.index === tileIndexDoorClosed) {
        const tile = doorLayer.putTileAt(tileIndexDoorOpened, x, y);
        tile.setCollision(false);
    }
    else {
        console.warn("Tried to use non-door tile as a door.")
    }
};