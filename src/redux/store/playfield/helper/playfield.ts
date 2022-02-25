import * as TypesPlayfield from "../types";


export function GetNewPlayfield(): TypesPlayfield.IPlayfieldMultiplication {
  const playfield: TypesPlayfield.IPlayfieldMultiplication = {
    sizeX: 10,
    sizeY: 5,
    fields: [],
    multiplicationTarget: undefined,
    userSetFactor: undefined,
    missed: 0,
  };
  const fields: TypesPlayfield.IField[] = [];
  for (let i = 0; i < playfield.sizeX * playfield.sizeY; i++) {
    fields.push({
      index: i,
      disabled: false,
      pressed: false,
      value: randomNumber(1, 9),
    })
  }
  playfield.fields = fields;
  playfield.multiplicationTarget = GetMultiplicationTarget(fields);

  return playfield;
}

function randomNumber(min, max) {
  if (min === max) {
    return 0;
  }
  return Math.floor(Math.random() * (max - min)) + min + 1;
}

export function GetMultiplicationTarget(remainingFields: TypesPlayfield.IField[]) {
  const remainingFieldsCopy: TypesPlayfield.IField[] = JSON.parse(JSON.stringify(
    remainingFields
  ));

  let f1: number = randomNumber(0, remainingFields.length - 1);
  remainingFieldsCopy.splice(f1, 1);
  let f2: number = randomNumber(0, remainingFieldsCopy.length - 1);

  // console.log("==> f1 ", f1, remainingFields);
  // console.log("==> f2 ", f2, remainingFieldsCopy);

  let v1 = remainingFields[f1].value;
  let v2 = remainingFieldsCopy[f2].value;

  return v1 * v2;
}

export function EvaluateMultiplicationPlayfield(
  statePlayfield: TypesPlayfield.IPlayfieldMultiplication,
  userSetField: TypesPlayfield.IField
) {
  if (statePlayfield.userSetFactor === undefined) {
    statePlayfield.userSetFactor = userSetField;
    statePlayfield.fields[userSetField.index] = userSetField;
  } else {
    const userMultiplicationResult = userSetField.value * statePlayfield.userSetFactor.value;
    if (userMultiplicationResult === statePlayfield.multiplicationTarget) {
      statePlayfield.fields[userSetField.index].disabled = true;
      statePlayfield.fields[statePlayfield.userSetFactor.index].disabled = true;
      statePlayfield.fields[statePlayfield.userSetFactor.index].pressed = false;

      const remainingFields = statePlayfield.fields.filter((i) => i.disabled === false);
      if (remainingFields.length > 0) {
        statePlayfield.multiplicationTarget = GetMultiplicationTarget(
          remainingFields
        );
      } else {
        // playfield finished
        // statePlayfield.fields = [];
        // statePlayfield.multiplicationTarget = undefined;
        // statePlayfield.userSetFactor = undefined;
      }
    } else {
      statePlayfield.fields[userSetField.index].disabled = false;
      statePlayfield.fields[userSetField.index].pressed = false;
      statePlayfield.fields[statePlayfield.userSetFactor.index].disabled = false;
      statePlayfield.fields[statePlayfield.userSetFactor.index].pressed = false;
      statePlayfield.missed++;
    }
    statePlayfield.userSetFactor = undefined;
  }
}