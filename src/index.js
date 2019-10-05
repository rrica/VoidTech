import GAME from './game';
GAME.scale.on('resize', (gameSize, baseSize, displaySize) => resizeMenu(displaySize.width, displaySize.height));

console.log(GAME.scale);

const dialogContainer = document.getElementById('dialog-parent');

function resizeMenu(width, height) {
	dialogContainer.style.width = width + 'px';
	dialogContainer.style.height = height + 'px';
}