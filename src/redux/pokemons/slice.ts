import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { POKEMONS, PokeState, PokeType } from "./types";
import { PageResultType } from "../pokemonPage/types";

const pokeInitialState: PokeState = {
  data: [],
  loading: false,
  error: "",
};

export const pokeSlice = createSlice({
  name: POKEMONS,
  initialState: pokeInitialState,
  reducers: {
    getPokemonsAction: (
      state: PokeState,
      { payload: results }: PayloadAction<PageResultType[]>
    ) => {
      state.loading = true;
      state.error = "";
    },
    getPokemonsSuccessAction: (
      state: PokeState,
      { payload: pokemons }: PayloadAction<PokeType[]>
    ) => {
      state.loading = false;
      state.data = state.data.concat(pokemons);
    },
    getPokemonsErrorAction: (
      state: PokeState,
      { payload: error }: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  getPokemonsAction,
  getPokemonsSuccessAction,
  getPokemonsErrorAction,
} = pokeSlice.actions;
export default pokeSlice.reducer;
