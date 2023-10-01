import axios, { AxiosResponse } from "axios";
import { all, put, takeLatest } from "redux-saga/effects";
import { getPageErrorAction, getPageSuccessAction } from "./pokemonPage/slice";
import { GET_PAGE, PageResultType, PageType } from "./pokemonPage/types";
import {
  getPokemonsAction,
  getPokemonsErrorAction,
  getPokemonsSuccessAction,
} from "./pokemons/slice";
import { GET_POKEMONS, PokeType } from "./pokemons/types";
import { PayloadAction } from "@reduxjs/toolkit";

export function* getPokemonPageSaga({
  payload,
}: PayloadAction<{ limit: number; next: string | null }>): Generator<
  any,
  void,
  AxiosResponse<any, any>
> {
  try {
    const url: string = payload.next
      ? payload.next
      : `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${payload.limit}`;
    const response: AxiosResponse<PageType> = yield axios.get(url);

    yield put(getPageSuccessAction(response.data));

    const { results } = response.data;

    yield put(getPokemonsAction(results));
  } catch (error) {
    yield put(getPageErrorAction(error as string));
  }
}

export function* getPokemonsSaga({
  payload: results,
}: PayloadAction<PageResultType[]>) {
  try {
    const requests = results.map(function* (result: PageResultType) {
      const response: AxiosResponse<PokeType[]> = yield axios.get(result.url);
      yield put(getPokemonsSuccessAction(response.data));
    });

    yield all(requests);
  } catch (error) {
    yield put(getPokemonsErrorAction(error as string));
  }
}

export function* watchGetPage() {
  yield takeLatest(GET_PAGE, getPokemonPageSaga);
}

export function* watchGetPokemons() {
  yield takeLatest(GET_POKEMONS, getPokemonsSaga);
}
