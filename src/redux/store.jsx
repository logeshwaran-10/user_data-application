import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [];

middlewares.push(sagaMiddleware);

const appReducer = combineReducers({ ...reducer });

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

sagaMiddleware.run(rootSaga);
