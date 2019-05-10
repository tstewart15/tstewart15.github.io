(function() {
  // first, check for "display: grid" support
  const $tilesContainer = document.querySelector('.tiles-container');
  const isGridSupported = typeof $tilesContainer.style.grid === 'string';
  if (!isGridSupported) return;

  const $tilesContainers = document.querySelectorAll('.tiles-container');
  const $contentWrapper = document.querySelector('.content-wrapper');

  const GRID_GAP = 10;
  const MIN_COL_WIDTH = 100;
  const MIN_ROW_HEIGHT = 60;
  const CHANGE_COLORS_INTERVAL_DURATION = 8000;

  const tileElementPool = [];

  updateView();

  addEventListener("resize", onResize);
  setInterval(randomizeAllTileColors, CHANGE_COLORS_INTERVAL_DURATION);

  function onResize() {
    updateView();
  }

  function updateView() {
    const numberOfTilesToFillUpGrid = getNumberOfTilesToFillUpGrid();
    for (let i = 0; i < numberOfTilesToFillUpGrid; i++) {
      addTileToView(i);
    }
    removeExtraTileElementsFromView(numberOfTilesToFillUpGrid);
  }

  function removeExtraTileElementsFromView(numberOfTilesDisplayed) {
    for (let i = numberOfTilesDisplayed; i < tileElementPool.length; i++) {
      tileElementPool[i].remove();
    }
  }

  function addTileToView(index) {
    let tile;
    if (index < tileElementPool.length) {
      tile = tileElementPool[index];
    } else {
      tile = createTileElement();
      tileElementPool.push(tile);
    }
    $tilesContainers[index % 2].appendChild(tile);
  }

  function createTileElement() {
    const tile = document.createElement('div');
    tile.style.backgroundColor = generateRandomCSSColor();
    tile.classList.add('tile');
    return tile;
  }

  function getNumberOfTilesToFillUpGrid() {
    const {
      offsetHeight: contentHeight,
      offsetWidth: contentWidth,
    } = $contentWrapper;
    const {
      innerWidth: windowWidth,
    } = window;

    if (contentWidth < windowWidth) {
      const marginWidth = (windowWidth - contentWidth) / 2;
      const numColumns = Math.floor((marginWidth - GRID_GAP) / (MIN_COL_WIDTH + GRID_GAP)) * 2;
      const numRows = Math.floor((contentHeight - GRID_GAP) / (MIN_ROW_HEIGHT + GRID_GAP));
      const numTiles = numColumns * numRows;
      return numTiles;
    } else {
      return 0;
    }
  }

  function randomizeAllTileColors() {
    for (let tile of tileElementPool) {
      randomizeTileColor(tile);
    }
  }

  function randomizeTileColor(tile) {
    tile.style.backgroundColor = generateRandomCSSColor();
  }

  function generateRandomCSSColor() {
    const r = generateRandomRGBValue();
    const g = generateRandomRGBValue();
    const b = generateRandomRGBValue();
    return `rgb(${r},${g},${b})`;
  }

  function generateRandomRGBValue() {
    return Math.floor(Math.random() * 256);
  }
})();
