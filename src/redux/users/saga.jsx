//Dependencies
import { all, put, takeLatest, call } from "redux-saga/effects";
import { getRequest } from "../../helper/axiosClient";
import { message } from "antd";

//actions
import { getUsersListSuccess, getUsersListFailure } from "./reducer";

export function* getUsersList(params) {
  try {
    let response = {};
    response = yield call(() => getRequest("/users"));
    yield put(getUsersListSuccess(response?.data));
  } catch (err) {
    message.error("Something Went Wrong");
    yield put(getUsersListFailure());
  }
}
export default function* rootSaga() {
  yield all([takeLatest("users/getUsersList", getUsersList)]);
}
