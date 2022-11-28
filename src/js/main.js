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
  uiElement.classList.add(floorCount);
  if (text) {
    uiElement.innerText = text;
  }
  return uiElement;
};

const appendUIElement = (parent, child) => {
  parent.appendChild(child);
};

const singleFloorUI = (floorCount) => {
  const floorContainer = createUIElement(
    "div",
    "floorContainer",
    floorCount,
    false
  );
  const floorButtonContainer = createUIElement(
    "div",
    "floorButtonContainer",
    floorCount,
    false
  );
  const floorUpButton = createUIElement(
    "button",
    "floorUpButton",
    floorCount,
    "UP"
  );
  const floorDownButton = createUIElement(
    "button",
    "floorDownButton",
    floorCount,
    "DOWN"
  );

  const floorTitle = createUIElement(
    "h2",
    "floorTitle",
    floorCount,
    `Floor ${floorCount}`
  );
  return {
    floorContainer,
    floorButtonContainer,
    floorUpButton,
    floorDownButton,
    floorTitle,
  };
};

const buildInteractiveUI = (liftCount, floorCount) => {
  const liftSimulator = document.querySelector(".lift-simulator");
  for (let i = floorCount; i > 0; i--) {
    const {
      floorContainer,
      floorButtonContainer,
      floorUpButton,
      floorDownButton,
      floorTitle,
    } = singleFloorUI(i);
    appendUIElement(liftSimulator, floorContainer);
    appendUIElement(floorContainer, floorButtonContainer);
    appendUIElement(floorButtonContainer, floorUpButton);
    appendUIElement(floorButtonContainer, floorDownButton);
    appendUIElement(floorContainer, floorTitle);
  }
  for (let j = 0; j <= liftCount; j++) {}
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
