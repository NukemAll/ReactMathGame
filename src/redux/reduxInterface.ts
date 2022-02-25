import { bindActionCreators } from "redux";

// actions
import * as ActionsPlayfield from "./store/playfield/actions";

// state
import * as TypesPlayfield from "./store/playfield/types";

// reducers
import ReducerPlayfield from "./store/playfield/reducers";

/*
 *  extends class props
 */
export interface IPropsRedux extends IActionsRedux, IStateRedux { }

/*
 *  combine reducers in store
 */
export const combinedReducers: ICombinedReducers = {
  reducerPlayfield: ReducerPlayfield,
}

/*
 *  Reducers
 */
export interface ICombinedReducers {
  reducerPlayfield: any;
}

/*
 *  States
 */
export interface IStateRedux {
  reduxStatePlayfield: TypesPlayfield.IPlayfieldState;
}

export const mapStateToProps = (state: ICombinedReducers): IStateRedux => {
  // console.log(" ==> IRedux, state= ", state);
  return {
    reduxStatePlayfield: state.reducerPlayfield,
  };
};

/*
 *  Actions
 */
export interface IActionsRedux {
  reduxActionsPlayfield: TypesPlayfield.IPlayfieldActions;
}

export const mapDispatchToProps = (dispatch): IActionsRedux => {
  return {
    reduxActionsPlayfield: bindActionCreators(ActionsPlayfield, dispatch),
  };
};
