import { all, fork } from "redux-saga/effects";
import { watchGetPage } from "./sagas";

const rootSaga = function* () {
  yield all([fork(watchGetPage)]);
};

export default rootSaga;
