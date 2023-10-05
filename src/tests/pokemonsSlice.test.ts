import { PageResultType } from "../redux/pokemonPage/types";
import reducer, {
  getPokemonsAction,
  getPokemonsErrorAction,
  getPokemonsSuccessAction,
} from "../redux/pokemons/slice";
import { PokeListState, PokeState, PokeType } from "../redux/pokemons/types";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    PokemonsList: {} as { [key: string]: PokeState },
  });
});

test("should handle getPokemonsAction", () => {
  const initialState: PokeListState = {
    PokemonsList: {},
  };
  expect(
    reducer(initialState, getPokemonsAction({ name: "" } as PageResultType))
  ).toEqual({
    PokemonsList: {
      "": {
        data: { name: "" } as PokeType,
        error: "",
        loading: true,
      },
    },
  });
});

test("should handle getPokemonsSuccessAction", () => {
  const previousState: PokeListState = {
    PokemonsList: {},
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
    PokemonsList: { Pikachu: { data: pokemon, loading: false, error: "" } },
  });
});

test("should handle getPokemonsErrorAction", () => {
  const previousState: PokeListState = {
    PokemonsList: {},
  };
  const errorMessage = "An error occurred";
  expect(
    reducer(
      previousState,
      getPokemonsErrorAction({ error: errorMessage, name: "" })
    )
  ).toEqual({
    PokemonsList: {
      "": {
        data: { name: "" } as PokeType,
        loading: false,
        error: errorMessage,
      },
    },
  });
});
