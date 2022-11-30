const validateCount = (count) => {
  if (count > 10 || count < 0) {
    return false;
  } else {
    return true;
  }
};

const createUIElement = (title, className, floorCount, text) => {
  const uiElement = document.createElement(title);
  uiElement.classList.add(className);
  if (text) {
    uiElement.innerText = text;
  }
  return uiElement;
};

const appendUIElement = (parent, child) => {
  parent.appendChild(child);
};

const floorUI = (floorCount) => {
  const floorContainer = createUIElement("div", "floor-container", false);
  floorContainer.innerHTML = `
    <div class="floor-content-container" data-floor=${floorCount}>
      <div class="floor-button-container">
      <button class="floor-up-button" data-up-button="${floorCount}" >UP</button>
      ${
        floorCount !== 1
          ? `<button class="floor-down-button" data-down-button="${floorCount}">DOWN</button>`
          : ""
      }
      </div>
      <h2 class="floor-title">Floor ${floorCount}</h2>
    </div>
  `;
  return {
    floorContainer,
  };
};

const liftUi = (liftCount) => {
  const liftContainer = createUIElement("div", "lift-container", false);
  liftContainer.setAttribute("data-lift", liftCount);
  liftContainer.innerHTML = `
    <div class="lift-door-1"></div>
    <div class="lift-door-2"></div>
  `;
  return liftContainer;
};

const buildInteractiveUI = (liftCount, floorCount) => {
  const liftSimulator = document.querySelector(".lift-simulator");
  for (let i = floorCount; i > 0; i--) {
    const { floorContainer } = floorUI(i);
    appendUIElement(liftSimulator, floorContainer);
  }
  const firstFloor = document.querySelector('[data-floor="1"]');

  for (let j = 1; j <= liftCount; j++) {
    const liftContainer = liftUi(j);
    appendUIElement(firstFloor, liftContainer);
  }
};

const intialUserInputsHandler = (event) => {
  event.preventDefault();
  const floorCount = Number(document.querySelector('[name = "floors"]').value);
  const liftCount = Number(document.querySelector('[name = "lifts"]').value);

  if (validateCount(floorCount) && validateCount(liftCount)) {
    document.querySelector(".lift-simulator__home").classList.add("hide");
    buildInteractiveUI(liftCount, floorCount);
  }
};

const moveLiftUp = () => {};

// document.querySelectorAll('.floor-up-button').
