import reducer, {
  getPokemonsAction,
  getPokemonsErrorAction,
  getPokemonsSuccessAction,
} from "../redux/pokemons/slice";
import { PokeState, PokeType } from "../redux/pokemons/types";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    data: [],
    loading: false,
    error: "",
  });
});

test("should handle getPokemonsAction", () => {
  const initialState: PokeState = {
    data: [],
    loading: false,
    error: "",
  };
  expect(reducer(initialState, getPokemonsAction([]))).toEqual({
    data: [],
    loading: true,
    error: "",
  });
});

test("should handle getPokemonsSuccessAction", () => {
  const previousState: PokeState = {
    data: [],
    loading: true,
    error: "",
  };
  const pokemons: PokeType[] = [
    {
      id: 1,
      order: 1,
      name: "Pikachu",
      types: [{ slot: 1, type: { name: "", url: "" } }],
      sprites: { front_default: "", back_default: "" },
      stats: [{ base_stat: 1, stat: { name: "" } }],
      height: 10,
      weight: 10,
      abilities: [{ ability: { name: "" } }],
    },
  ];
  expect(reducer(previousState, getPokemonsSuccessAction(pokemons))).toEqual({
    data: pokemons,
    loading: false,
    error: "",
  });
});

test("getPokemonsSuccessAction should add to data to existing list", () => {
  const previousState: PokeState = {
    data: [
      {
        id: 1,
        order: 1,
        name: "Pikachu",
        types: [{ slot: 1, type: { name: "", url: "" } }],
        sprites: { front_default: "", back_default: "" },
        stats: [{ base_stat: 1, stat: { name: "" } }],
        height: 10,
        weight: 10,
        abilities: [{ ability: { name: "" } }],
      },
    ],
    loading: true,
    error: "",
  };
  const pokemons: PokeType[] = [
    {
      id: 1,
      order: 1,
      name: "Snorlax",
      types: [{ slot: 1, type: { name: "", url: "" } }],
      sprites: { front_default: "", back_default: "" },
      stats: [{ base_stat: 1, stat: { name: "" } }],
      height: 10,
      weight: 10,
      abilities: [{ ability: { name: "" } }],
    },
  ];
  expect(reducer(previousState, getPokemonsSuccessAction(pokemons))).toEqual({
    data: [
      {
        id: 1,
        order: 1,
        name: "Pikachu",
        types: [{ slot: 1, type: { name: "", url: "" } }],
        sprites: { front_default: "", back_default: "" },
        stats: [{ base_stat: 1, stat: { name: "" } }],
        height: 10,
        weight: 10,
        abilities: [{ ability: { name: "" } }],
      },
      {
        id: 1,
        order: 1,
        name: "Snorlax",
        types: [{ slot: 1, type: { name: "", url: "" } }],
        sprites: { front_default: "", back_default: "" },
        stats: [{ base_stat: 1, stat: { name: "" } }],
        height: 10,
        weight: 10,
        abilities: [{ ability: { name: "" } }],
      },
    ],
    loading: false,
    error: "",
  });
});

test("should handle getPokemonsErrorAction", () => {
  const previousState: PokeState = {
    data: [],
    loading: true,
    error: "",
  };
  const errorMessage = "An error occurred";
  expect(reducer(previousState, getPokemonsErrorAction(errorMessage))).toEqual({
    data: [],
    loading: false,
    error: errorMessage,
  });
});
