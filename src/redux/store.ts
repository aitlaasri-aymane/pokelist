import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./pokemons/slice";
import pageReducer from "./pokemonPage/slice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { pokemons: pokemonsReducer, page: pageReducer },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
