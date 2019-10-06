export function getPhaserTileIndexFromTiledGid(layer, gid) {
    const tileIndicesOfLayer = Object.keys(layer.gidMap).map(index => parseInt(index)).sort();
    return tileIndicesOfLayer[gid];
}