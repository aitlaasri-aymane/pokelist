import { takeLatest } from "redux-saga/effects";
import {
  getPokemonPageSaga,
  getPokemonsSaga,
  watchGetPage,
  watchGetPokemons,
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
  it("should call api and dispatch getPageSuccessAction and getPokemonsAction", async () => {
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
    expect(dispatched[0]).toEqual(
      getPageSuccessAction(dummyPages.data as PageType)
    );
    expect(dispatched[1]).toEqual(
      getPokemonsAction(dummyPages.data.results as PageResultType[])
    );
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
  it("should call API for each result and dispatch success actions", async () => {
    const dummyResults: PageResultType[] = [
      {
        name: "bulbasaur",
        url: "1",
      },
      {
        name: "ivysaur",
        url: "2",
      },
    ];

    const dummyResponses = [
      {
        data: {},
        status: 200,
        statusText: "",
        headers: {},
        config: {},
      },
      {
        data: {},
        status: 200,
        statusText: "",
        headers: {},
        config: {},
      },
    ];

    const requestPokemon = mockedAxios.get.mockImplementation((url) => {
      if (url === dummyResults[0].url) {
        return Promise.resolve(dummyResponses[0]);
      }
      if (url === dummyResults[1].url) {
        return Promise.resolve(dummyResponses[1]);
      }
      return Promise.reject("Invalid URL");
    });

    const dispatched: any[] = [];
    const result: Task = await runSaga(
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
      getPokemonsSuccessAction(dummyResponses[0].data as PokeType[])
    );
    expect(dispatched[1]).toEqual(
      getPokemonsSuccessAction(dummyResponses[1].data as PokeType[])
    );

    expect(requestPokemon).toHaveBeenCalledTimes(dummyResults.length);

    requestPokemon.mockRestore();
  });

  it("should call API and dispatch error action on failure", async () => {
    const requestPokemon = mockedAxios.get.mockRejectedValue("error");

    const dummyResults: PageResultType[] = [
      {
        name: "bulbasaur",
        url: "",
      },
    ];

    const dispatched: any[] = [];
    const result: Task = await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getPokemonsSaga,
      {
        payload: dummyResults,
        type: GET_POKEMONS,
      }
    );

    expect(dispatched[0]).toEqual(getPokemonsErrorAction("error"));

    expect(requestPokemon).toHaveBeenCalledTimes(dummyResults.length);

    requestPokemon.mockRestore();
  });
});

describe("watchGetPage", () => {
  const genObject = watchGetPage();

  it("should wait GET_PAGE action and call getPokemonPageSaga", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(GET_PAGE, getPokemonPageSaga)
    );
  });

  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});

describe("watchGetPokemons", () => {
  const genObject = watchGetPokemons();

  it("should wait GET_POKEMONS action and call getPokemonsSaga", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(GET_POKEMONS, getPokemonsSaga)
    );
  });

  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
