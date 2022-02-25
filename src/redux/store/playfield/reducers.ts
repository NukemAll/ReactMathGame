import { handleActions } from "redux-actions";

import {
  types,
  IPlayfieldState,
} from "./types";

const initialState: IPlayfieldState = {
  playfieldMultiplication: undefined,
};

export default handleActions({
  [types.SET_PLAYFIELD_MULTIPLICATION]: (state: IPlayfieldState, action): IPlayfieldState => {
    return { ...state, playfieldMultiplication: action.payload };
  },

}, initialState);
