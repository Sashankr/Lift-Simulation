const dataStore = {
  floorCount: 0,
  liftCount: 0,
  lifts: [],
};

const checkAvailableLifts = (floorId) => {
  console.log(dataStore);
  const { lifts, emptyFloors } = dataStore;
  const liftList = Array.from(document.querySelectorAll(".lift-container"));
  const stationaryLift = liftList.find((lift) => {
    return lift.getAttribute("ismoving") === "false";
  });
  debugger;
  const stationaryLiftId = Number(stationaryLift.getAttribute("data-lift"));
  console.log("stationary", stationaryLiftId);

  let collisionFreeLiftId;

  lifts.map((lift) => {
    if (lift.liftId === stationaryLiftId && lift.currentFloor !== floorId) {
      collisionFreeLiftId = lift.liftId;
    } else {
      return;
    }
  });

  console.log(dataStore);

  console.log("collision-free-lift", collisionFreeLiftId);

  return collisionFreeLiftId;
};

const liftEngine = (event) => {
  console.log(event.target);
  const floorId = Number(event.target.getAttribute("data-floor-button"));
  const direction = event.target.getAttribute("data-floor-direction");

  const currentLiftId = checkAvailableLifts(floorId);

  moveLift(direction, floorId, currentLiftId);

  updateDataStore(() => {
    const updatedInformation = dataStore.lifts.map((lift) => {
      if (lift.liftId === currentLiftId) {
        return {
          ...lift,
          currentFloor: floorId,
        };
      } else {
        return lift;
      }
    });

    dataStore.lifts = updatedInformation;
  });
};

const updateDataStore = (callback) => {
  callback();
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
      <button class="floor-button" data-floor-button="${floorCount}" data-floor-direction="up" >UP</button>
      ${
        floorCount !== 0
          ? `<button class="floor-button" data-floor-button="${floorCount}" data-floor-direction="down">DOWN</button>`
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
  liftContainer.setAttribute("ismoving", false);

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

const moveLift = (direction, floorId, liftId) => {
  const lift = document.querySelector(`[data-lift="${liftId}"]`);
  const offsetValue = 200;
  lift.setAttribute("ismoving", true);

  lift.style.transform = `translateY(-${floorId * offsetValue}px)`;
  setTimeout(() => {
    lift.setAttribute("ismoving", false);
  }, 2500);
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
        dataStore.lifts.push({ currentFloor: 0, liftId: i });
      }

      buildInteractiveUI(floorCount, liftCount);
    });

    const floorButtons = document.querySelectorAll(".floor-button");

    Array.from(floorButtons).forEach((button) => {
      button.addEventListener("click", (event) => liftEngine(event));
      button.addEventListener("dblclick", (event) => event.preventDefault());
    });
  }
};
