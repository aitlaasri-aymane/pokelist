import { PageResultType } from "../redux/pokemonPage/types";
import reducer, {
  getPokemonsAction,
  getPokemonsErrorAction,
  getPokemonsSuccessAction,
} from "../redux/pokemons/slice";
import { PokeListState, PokeState, PokeType } from "../redux/pokemons/types";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    List: [] as PokeState[],
    StateHolder: {} as PokeState,
  });
});

test("should handle getPokemonsAction", () => {
  const initialState: PokeListState = {
    List: [],
    StateHolder: {} as PokeState,
  };
  expect(
    reducer(initialState, getPokemonsAction({} as PageResultType))
  ).toEqual({
    List: [
      {
        data: {} as PokeType,
        error: "",
        loading: true,
      },
    ],
    StateHolder: {},
  });
});

test("should handle getPokemonsSuccessAction", () => {
  const previousState: PokeListState = {
    List: [
      {
        data: {} as PokeType,
        error: "",
        loading: true,
      },
    ],
    StateHolder: {} as PokeState,
  };
  const pokemon: PokeType = {
    id: 1,
    order: 1,
    name: "Pikachu",
    types: [{ slot: 1, type: { name: "", url: "" } }],
    sprites: { front_default: "", back_default: "" },
    stats: [{ base_stat: 1, stat: { name: "" } }],
    height: 10,
    weight: 10,
    abilities: [{ ability: { name: "" } }],
  };
  expect(reducer(previousState, getPokemonsSuccessAction(pokemon))).toEqual({
    List: [{ data: pokemon, loading: false, error: "" }],
    StateHolder: {} as PokeState,
  });
});

test("should handle getPokemonsErrorAction", () => {
  const previousState: PokeListState = {
    List: [
      {
        data: {} as PokeType,
        loading: true,
        error: "",
      },
    ],
    StateHolder: {} as PokeState,
  };
  const errorMessage = "An error occurred";
  expect(reducer(previousState, getPokemonsErrorAction(errorMessage))).toEqual({
    List: [
      {
        data: {} as PokeType,
        loading: false,
        error: errorMessage,
      },
    ],
    StateHolder: {} as PokeState,
  });
});
