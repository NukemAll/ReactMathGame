import {
  types,
  IPlayfieldState,
  IField,
  IPlayfieldMultiplication,
} from "./types";

import {
  ICombinedReducers
} from "../../reduxInterface";

import * as helperPlayfield from "./helper/playfield";


export function setFieldInPlayfield(userSetField: IField) {
  return (dispatch, getState) => {
    const statePlayfield: IPlayfieldMultiplication = JSON.parse(JSON.stringify(
      ((getState() as ICombinedReducers)
        .reducerPlayfield as IPlayfieldState)
        .playfieldMultiplication
    ));

    helperPlayfield.EvaluateMultiplicationPlayfield(statePlayfield, userSetField);

    dispatch({
      type: types.SET_PLAYFIELD_MULTIPLICATION,
      payload: statePlayfield,
    });
  }

}

export function startMultiplicationGame() {
  return (dispatch) => {
    const playfield = helperPlayfield.GetNewPlayfield();

    dispatch({
      type: types.SET_PLAYFIELD_MULTIPLICATION,
      payload: playfield,
    })

  }
}
