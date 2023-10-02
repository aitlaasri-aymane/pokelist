export type PokeType = {
  id: number;
  order: number;
  name: string;
  types: { slot: number; type: { name: string; url: string } }[];
  sprites: { front_default: string; back_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
};

export type PokeState = {
  data: PokeType;
  loading: boolean;
  error: string;
};

export type PokeListState = {
  List: PokeState[];
  StateHolder: PokeState;
};

export type PokeStateType = {
  pokemons: PokeListState;
};

export const POKEMONS = "pokemons";
export type POKEMONS = typeof POKEMONS;

export const GET_POKEMONS = `${POKEMONS}/getPokemonsAction`;
export type GET_POKEMONS = typeof GET_POKEMONS;
