import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { POKEMONS, PokeListState, PokeState, PokeType } from "./types";
import { PageResultType } from "../pokemonPage/types";

const pokeInitialState: PokeListState = {
  PokemonsList: {} as { [key: string]: PokeState },
};

export const pokeSlice = createSlice({
  name: POKEMONS,
  initialState: pokeInitialState,
  reducers: {
    getPokemonsAction: (
      state: PokeListState,
      { payload: result }: PayloadAction<PageResultType>
    ) => {
      state.PokemonsList[result.name] = {
        data: { name: result.name } as PokeType,
        loading: true,
        error: "",
      };
    },
    getPokemonsSuccessAction: (
      state: PokeListState,
      { payload: pokemon }: PayloadAction<PokeType>
    ) => {
      state.PokemonsList[pokemon.name] = {
        data: pokemon,
        loading: false,
        error: "",
      };
    },
    getPokemonsErrorAction: (
      state: PokeListState,
      {
        payload: { error, name },
      }: PayloadAction<{ error: string; name: string }>
    ) => {
      state.PokemonsList[name] = {
        data: { name: name } as PokeType,
        loading: false,
        error: error,
      };
    },
  },
});

export const {
  getPokemonsAction,
  getPokemonsSuccessAction,
  getPokemonsErrorAction,
} = pokeSlice.actions;
export default pokeSlice.reducer;
