import axios, { AxiosResponse } from "axios";
import { call, put, takeLeading } from "redux-saga/effects";
import { getPageErrorAction, getPageSuccessAction } from "./pokemonPage/slice";
import { GET_PAGE, PageResultType, PageType } from "./pokemonPage/types";
import {
  getPokemonsAction,
  getPokemonsErrorAction,
  getPokemonsSuccessAction,
} from "./pokemons/slice";
import { PokeType } from "./pokemons/types";
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

    for (const result of results) {
      yield call(getPokemonsSaga, {
        payload: result,
      } as PayloadAction<PageResultType>);
    }
  } catch (error) {
    yield put(getPageErrorAction(error as string));
  }
}

export function* getPokemonsSaga({
  payload: result,
}: PayloadAction<PageResultType>) {
  try {
    const response: AxiosResponse<PokeType> = yield axios.get(result.url);
    yield put(getPokemonsAction(result));
    yield put(getPokemonsSuccessAction(response.data));
  } catch (error) {
    yield put(getPokemonsErrorAction(error as string));
  }
}

export function* watchGetPage() {
  yield takeLeading(GET_PAGE, getPokemonPageSaga);
}
