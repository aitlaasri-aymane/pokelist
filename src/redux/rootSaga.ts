import { all, fork } from "redux-saga/effects";

import { watchGetPage, watchGetPoke } from "./sagas";

const rootSaga = function* () {
  yield all([fork(watchGetPage), fork(watchGetPoke)]);
};

export default rootSaga;
