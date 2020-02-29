(function() {
  // first, check for "display: grid" support
  const $tilesContainer = document.querySelector('.tiles-container');
  const isGridSupported = typeof $tilesContainer.style.grid === 'string';
  if (!isGridSupported) return;

  const $tilesContainers = document.querySelectorAll('.tiles-container');
  const $contentWrapper = document.querySelector('.content-wrapper');

  const GRID_GAP = 10;
  const MIN_COL_WIDTH = 120;
  const MIN_ROW_HEIGHT = 80;

  const tileElementPool = [];

  const smallScreenMediaQuery = matchMedia('(max-width: 540px)');
  smallScreenMediaQuery.addListener(onSmallScreenMediaQueryChange);
  if (!smallScreenMediaQuery.matches) {
    setup();
  }

  function onSmallScreenMediaQueryChange() {
    if (smallScreenMediaQuery.matches) {
      teardown();
    } else {
      setup();
    }
  }

  function setup() {
    setupTiles();
    addEventListener('resize', onResize);
  }

  function teardown() {
    removeEventListener('resize', onResize);
  }

  function onResize() {
    setupTiles();
  }

  function setupTiles() {
    const numberOfTilesInView = getNumberOfTilesInView();
    for (let i = 0; i < numberOfTilesInView; i++) {
      addTileToView(i);
    }
    removeExtraTileElementsFromView(numberOfTilesInView);
  }

  function removeExtraTileElementsFromView(numberOfTilesInView) {
    for (let i = numberOfTilesInView; i < tileElementPool.length; i++) {
      tileElementPool[i] && tileElementPool[i].remove();
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
    randomizeTileColor(tile);
    tile.classList.add('tile');
    return tile;
  }

  function getNumberOfTilesInView() {
    const {
      offsetWidth: contentWidth,
    } = $contentWrapper;
    const {
      clientWidth: bodyWidth,
    } = document.body;
    const {
      innerHeight: windowHeight,
    } = window;

    if (contentWidth < bodyWidth) {
      const marginWidth = (bodyWidth - contentWidth) / 2;
      const numColumns = Math.floor((marginWidth - GRID_GAP) / (MIN_COL_WIDTH + GRID_GAP)) * 2;
      const numRows = Math.floor((windowHeight - GRID_GAP) / (MIN_ROW_HEIGHT + GRID_GAP));
      const numTiles = numColumns * numRows;
      return numTiles;
    } else {
      return 0;
    }
  }

  function randomizeTileColor(tile) {
    tile.style.backgroundColor = getRandomCSSColor();
  }

  function getRandomCSSColor() {
    const r = getRandomRGBValue();
    const g = getRandomRGBValue();
    const b = getRandomRGBValue();
    return `rgb(${r},${g},${b})`;
  }

  function getRandomRGBValue() {
    return Math.floor(Math.random() * 256);
  }
})();
