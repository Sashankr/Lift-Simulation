const validateCount = (count) => {
  if (count > 10 || count < 0) {
    return false;
  } else {
    return true;
  }
};

const intialUserInputsHandler = (event) => {
  event.preventDefault();
  const floorCount = Number(document.querySelector('[name = "floors"]').value);
  const liftCount = Number(document.querySelector('[name = "lifts"]').value);

  if (validateCount(floorCount) && validateCount(liftCount)) {
    document.querySelector(".lift-simulator__home").classList.add("hide");
  }
};
