import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { logger, thunk } from "./middleware/index";

import { combinedReducers } from "../reduxInterface"

import { composeWithDevTools } from "@redux-devtools/extension";


const rootReducer = combineReducers(combinedReducers);

const configureStore = () => {
  const middlewares = [thunk, logger];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const env = process.env.NODE_ENV.trim();

  const store = createStore(
    rootReducer,
    (env === "development")
      ? composeWithDevTools(middleWareEnhancer)
      : compose(middleWareEnhancer),
  );

  return store;
};

export default configureStore;