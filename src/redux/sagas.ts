import axios, { AxiosResponse } from "axios";
import { all, put, takeEvery, takeLeading } from "redux-saga/effects";
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

    yield all(
      results.map(function* (result: PageResultType) {
        yield put(getPokemonsAction(result));
      })
    );
  } catch (error) {
    yield put(getPageErrorAction(error as string));
  }
}

export function* getPokemonsSaga({
  payload: result,
}: PayloadAction<PageResultType>) {
  try {
    const response: AxiosResponse<PokeType> = yield axios.get(result.url);
    yield put(getPokemonsSuccessAction(response.data));
  } catch (error) {
    yield put(
      getPokemonsErrorAction({
        error: error as string,
        name: result.name as string,
      })
    );
  }
}

export function* watchGetPage() {
  yield takeLeading(GET_PAGE, getPokemonPageSaga);
}

export function* watchGetPoke() {
  yield takeEvery(GET_POKEMONS, getPokemonsSaga);
}
