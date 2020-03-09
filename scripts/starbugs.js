(function() {
  const STARBUGS_PER_PIXEL = 0.0003;
  const STARBUG_TEMPLATES_COUNT = 4;
  const WINDOW_RESIZE_DEBOUNCE_DURATION = 500;

  let starbugRefreshIsActive = false;
  let currentSetupStarbugsTimeout;

  const starbugCurtain = document.querySelector('.starbug-curtain');
  let starbugs = [];
  const starbugTemplates = [];
  for (let i=0; i < STARBUG_TEMPLATES_COUNT; i++) {
    const starbugTemplate = document.querySelector('#starbug'+i);
    starbugTemplates.push(starbugTemplate);
  }

  let windowHeight;
  let windowWidth;

  addEventListener('resize', onWindowResize);
  setupStarbugs();

  function onWindowResize() {
    if (starbugRefreshIsActive) {
      setupStarbugsAfterWindowResizeDebouncePeriod();
    } else {
      starbugRefreshIsActive = true;
      removeAllStarbugsFromDOM();
      closeStarbugCurtain();
      setupStarbugsAfterWindowResizeDebouncePeriod();
    }
  }

  function setupStarbugsAfterWindowResizeDebouncePeriod() {
    if (currentSetupStarbugsTimeout) {
      clearTimeout(currentSetupStarbugsTimeout);
    }
    currentSetupStarbugsTimeout = setTimeout(setupStarbugs, WINDOW_RESIZE_DEBOUNCE_DURATION);
  }

  function setupStarbugs() {
    resetWindowDimensionVariables();
    const pixelsInWindow = windowWidth * windowHeight;
    const numberOfStarbugsToAdd = STARBUGS_PER_PIXEL * pixelsInWindow;
    addStarbugsToDOM(numberOfStarbugsToAdd);
    openStarbugCurtain();
    resetRefreshVariables();
  }

  function resetWindowDimensionVariables() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  }

  function resetRefreshVariables() {
    currentSetupStarbugsTimeout = null;
    starbugRefreshIsActive = false;
  }

  function openStarbugCurtain() {
    starbugCurtain.classList.add('open');
  }

  function closeStarbugCurtain() {
    starbugCurtain.classList.remove('open');
  }

  function addStarbugsToDOM(numberOfStarbugsToAdd) {
    for (let i = 0; i < numberOfStarbugsToAdd; i++) {
      addStarbugToDOM();
    }
  }

  function addStarbugToDOM() {
    const starbugTemplateIdNumber = getRandomIntFromZeroToExcludedMaxInt(4);
    const starbugTemplate = starbugTemplates[starbugTemplateIdNumber];
    const starbugNode = starbugTemplate.content.cloneNode(true);

    const starbugX = getRandomIntFromZeroToExcludedMaxInt(windowWidth);
    const starbugY = getRandomIntFromZeroToExcludedMaxInt(windowHeight);

    const starbugSVG = starbugNode.querySelector('svg');
    const color = getRandomCSSColor();
    starbugSVG.setAttribute('style', `top:${starbugY}px;left:${starbugX}px;stroke:${color};fill:${color}`);

    document.body.appendChild(starbugNode);
    starbugs.push(starbugSVG);
  }

  function removeAllStarbugsFromDOM() {
    for (let i = 0; i < starbugs.length; i++) {
      starbugs[i].remove();
    }
    starbugs = [];
  }

  function getRandomCSSColor() {
    const r = getRandomRGBValue();
    const g = getRandomRGBValue();
    const b = getRandomRGBValue();
    return `rgb(${r},${g},${b})`;
  }

  function getRandomRGBValue() {
    return getRandomIntFromZeroToExcludedMaxInt(256);
  }

  function getRandomIntFromZeroToExcludedMaxInt(maxInt) {
    return Math.floor(Math.random() * maxInt);
  }
})();