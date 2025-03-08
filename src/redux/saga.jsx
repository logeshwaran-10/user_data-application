import { all } from "redux-saga/effects";
import userListSaga from "./users/saga";

const saga = [
  userListSaga(),
  // We can add upcoming saga here..
];
export default function* rootSaga(getState) {
  yield all([...saga]);
}
