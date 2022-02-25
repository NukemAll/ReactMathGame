export const types = {
  SET_PLAYFIELD_MULTIPLICATION: "SET_PLAYFIELD_MULTIPLICATION",
}

// state
export interface IPlayfieldState {
  playfieldMultiplication: IPlayfieldMultiplication;
}

// actions
export interface IPlayfieldActions {
  setFieldInPlayfield: (field: IField) => void;

  startMultiplicationGame: () => void;
}


interface IPlayfield {
  sizeX: number;
  sizeY: number;
  fields: IField[];
}

export interface IField {
  index: number;
  value: number;
  pressed: boolean;
  disabled: boolean;
}

export interface IPlayfieldMultiplication extends IPlayfield {
  multiplicationTarget: number;
  userSetFactor: IField;
  missed: number;
}