import { all, fork } from "redux-saga/effects";
import { watchGetPage, watchGetPokemons } from "./sagas";

const rootSaga = function* () {
  yield all([fork(watchGetPage), fork(watchGetPokemons)]);
};

export default rootSaga;
