import { takeLeading } from "redux-saga/effects";
import {
  getPokemonPageSaga,
  getPokemonsSaga,
  watchGetPage,
} from "../redux/sagas";
import { GET_PAGE, PageResultType, PageType } from "../redux/pokemonPage/types";
import { GET_POKEMONS, PokeType } from "../redux/pokemons/types";
import axios from "axios";
import { Task, runSaga } from "redux-saga";
import {
  getPageErrorAction,
  getPageSuccessAction,
} from "../redux/pokemonPage/slice";
import {
  getPokemonsAction,
  getPokemonsErrorAction,
  getPokemonsSuccessAction,
} from "../redux/pokemons/slice";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getPokemonPageSaga", () => {
  it("should fetch pokemon page data and dispatch success action", async () => {
    const dummyPages = {
      data: {
        count: 1,
        next: null,
        previous: null,
        results: [],
      },
      status: 200,
      statusText: "",
      headers: {},
      config: {},
    };
    const requestPages = mockedAxios.get.mockImplementation(() =>
      Promise.resolve(dummyPages)
    );
    const dispatched: any = [];
    const result: Task = await runSaga<any, any, any>(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getPokemonPageSaga,
      {
        payload: dummyPages,
        type: GET_POKEMONS,
      }
    );

    expect(requestPages).toHaveBeenCalledTimes(1);
    expect(dispatched).toContainEqual(getPageSuccessAction(dummyPages.data));

    requestPages.mockClear();
  });

  it("should call api and dispatch error action", async () => {
    const dummyPages = {
      data: {},
      status: 200,
      statusText: "",
      config: {},
    };
    const requestPages = mockedAxios.get.mockImplementation(() =>
      Promise.reject("error")
    );
    const dispatched: object = {};
    const result: Task = await runSaga<any, any, any>(
      {
        dispatch: (action) => Object.assign(dispatched, action),
      },
      getPokemonPageSaga,
      {
        payload: dummyPages,
        type: GET_POKEMONS,
      }
    );

    expect(requestPages).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual(getPageErrorAction("error"));
    requestPages.mockClear();
  });
});

describe("getPokemonsSaga", () => {
  it("should call API and dispatch success action", async () => {
    const dummyResult: PageResultType = {
      name: "bulbasaur",
      url: "1",
    };

    const dummyResponse = {
      data: {},
      status: 200,
      statusText: "",
      headers: {},
      config: {},
    };

    const requestPokemon = mockedAxios.get.mockImplementation(() => {
      return Promise.resolve(dummyResponse);
    });

    const dispatched: any[] = [];
    const result: Task = await runSaga<any, any, any>(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getPokemonsSaga,
      {
        payload: dummyResult,
        type: GET_POKEMONS,
      }
    );

    expect(dispatched[0]).toEqual(
      getPokemonsSuccessAction(dummyResponse.data as PokeType)
    );

    expect(requestPokemon).toHaveBeenCalledTimes(1);

    requestPokemon.mockRestore();
  });

  it("should call API and dispatch error action on failure", async () => {
    const requestPokemon = mockedAxios.get.mockRejectedValue("error");

    const dummyResults: PageResultType = {
      name: "bulbasaur",
      url: "",
    };

    const dispatched: any[] = [];
    const result: Task = await runSaga<any, any, any>(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getPokemonsSaga,
      {
        payload: dummyResults,
        type: GET_POKEMONS,
      }
    );

    expect(dispatched[0]).toEqual(
      getPokemonsErrorAction({ error: "error", name: "bulbasaur" })
    );

    expect(requestPokemon).toHaveBeenCalledTimes(1);

    requestPokemon.mockRestore();
  });
});

describe("watchGetPage", () => {
  const genObject = watchGetPage();

  it("should wait GET_PAGE action and call getPokemonPageSaga", () => {
    expect(genObject.next().value).toEqual(
      takeLeading(GET_PAGE, getPokemonPageSaga)
    );
  });

  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
