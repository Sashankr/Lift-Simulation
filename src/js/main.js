const dataStore = {
  floorCount: 0,
  liftCount: 0,
  lifts: {},
  emptyFloors: [],
};

const updateDataStore = (callback) => {
  callback();
  const floorCount = dataStore.floorCount;
  const liftCount = dataStore.liftCount;
  console.log(dataStore);
  buildInteractiveUI(floorCount, liftCount);
};

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
      <button class="floor-up-button" data-floor-button="${floorCount}" data-floor-direction="up" >UP</button>
      ${
        floorCount !== 0
          ? `<button class="floor-down-button" data-floor-button="${floorCount}" data-floor-direction="down">DOWN</button>`
          : ""
      }
      </div>
      ${
        floorCount === 0
          ? '<h2 class="floor-title">Ground Floor</h2>'
          : `<h2 class="floor-title">Floor ${floorCount}</h2>`
      }
    </div>
  `;
  return {
    floorContainer,
  };
};

const liftUi = (liftCount) => {
  const liftContainer = createUIElement("div", "lift-container", false);
  liftContainer.setAttribute("data-lift", liftCount);
  liftContainer.setAttribute("data-floor-number", 0);

  liftContainer.innerHTML = `
    <div class="lift-door-1"></div>
    <div class="lift-door-2"></div>
  `;
  return liftContainer;
};

const buildInteractiveUI = (floorCount, liftCount) => {
  const liftSimulator = document.querySelector(".lift-simulator");
  for (let i = floorCount; i >= 0; i--) {
    const { floorContainer } = floorUI(i);
    appendUIElement(liftSimulator, floorContainer);
  }
  const firstFloor = document.querySelector('[data-floor="0"]');
  for (let j = 1; j <= liftCount; j++) {
    const liftContainer = liftUi(j);
    appendUIElement(firstFloor, liftContainer);
  }
};

const moveLift = (event, direction) => {
  const firstLift = document.querySelector('[data-lift="1"]');
  const offsetValue = 200;

  if (direction === "up") {
    const upButtonId = Number(event.target.getAttribute("data-up-button"));
    if (upButtonId === 0) {
      firstLift.style.transform = "translateY(0px)";
    } else {
      firstLift.style.transform = `translateY(-${upButtonId * offsetValue}px)`;
    }
  } else {
    const downButtonId = Number(event.target.getAttribute("data-down-button"));
  }
};

const intialUserInputsHandler = (event) => {
  event.preventDefault();
  const floorCount = Number(document.querySelector('[name = "floors"]').value);
  const liftCount = Number(document.querySelector('[name = "lifts"]').value);

  if (validateCount(floorCount) && validateCount(liftCount)) {
    document.querySelector(".lift-simulator__home").classList.add("hide");
    updateDataStore(() => {
      dataStore.floorCount = floorCount;
      dataStore.liftCount = liftCount;
      for (let i = 1; i <= liftCount; i++) {
        dataStore.lifts[i] = { currentFloor: 0 };
      }
      for (let j = 1; j <= floorCount; j++) {
        dataStore.emptyFloors.push(j);
      }
    });
    const floorUpButtons = document.querySelectorAll(".floor-up-button");
    const floorDownButtons = document.querySelectorAll(".floor-down-button");

    Array.from(floorUpButtons).forEach((button) =>
      button.addEventListener("click", (event) => moveLift(event, "up"))
    );

    Array.from(floorDownButtons).forEach((button) =>
      button.addEventListener("click", (event) => moveLift(event, "down"))
    );
  }
};

// 1 : {currentFloor:0}
