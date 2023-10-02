import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { POKEMONS, PokeListState, PokeState, PokeType } from "./types";
import { PageResultType } from "../pokemonPage/types";

const pokeInitialState: PokeListState = {
  List: [] as PokeState[],
  StateHolder: {} as PokeState,
};

export const pokeSlice = createSlice({
  name: POKEMONS,
  initialState: pokeInitialState,
  reducers: {
    getPokemonsAction: (
      state: PokeListState,
      { payload: result }: PayloadAction<PageResultType>
    ) => {
      state.StateHolder.error = "";
      state.StateHolder.loading = true;
      state.StateHolder.data = {} as PokeType;
      state.List.push(state.StateHolder);
      state.StateHolder = {} as PokeState;
    },
    getPokemonsSuccessAction: (
      state: PokeListState,
      { payload: pokemon }: PayloadAction<PokeType>
    ) => {
      const lastIndex = state.List.length - 1;
      state.StateHolder.loading = false;
      state.StateHolder.data = pokemon;
      state.List[lastIndex] = {
        ...state.List[lastIndex],
        ...state.StateHolder,
      };
      state.StateHolder = {} as PokeState;
    },
    getPokemonsErrorAction: (
      state: PokeListState,
      { payload: error }: PayloadAction<string>
    ) => {
      const lastIndex = state.List.length - 1;
      state.StateHolder.loading = false;
      state.StateHolder.error = error;
      state.List[lastIndex] = {
        ...state.List[lastIndex],
        ...state.StateHolder,
      };
      state.StateHolder = {} as PokeState;
    },
  },
});

export const {
  getPokemonsAction,
  getPokemonsSuccessAction,
  getPokemonsErrorAction,
} = pokeSlice.actions;
export default pokeSlice.reducer;
