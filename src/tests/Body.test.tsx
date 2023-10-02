import React from "react";
import { render, screen } from "@testing-library/react";
import Body from "../components/Body";
import { PokeState } from "../redux/pokemons/types";
import { PageState } from "../redux/pokemonPage/types";
import store from "../redux/store";
import { Provider } from "react-redux";

const pokemons: PokeState[] = [
  {
    data: {
      id: 1,
      name: "Pokemon Name",
      height: 10,
      weight: 10,
      order: 1,
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        back_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
      },
      types: [
        {
          slot: 1,
          type: {
            name: "normal",
            url: "",
          },
        },
      ],
      abilities: [
        {
          ability: {
            name: "ability1",
          },
        },
      ],
      stats: [
        {
          base_stat: 10,
          stat: {
            name: "stat1",
          },
        },
      ],
    },
    loading: false,
    error: "",
  },
];

const page: PageState = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  loading: false,
  error: "",
};

test("renders Body component without errors", () => {
  render(
    <Provider store={store}>
      <Body page={page} pokemons={pokemons} limit={15} />
    </Provider>
  );
  const endMessage = screen.getByText("You have seen all the pokemons!");
  expect(endMessage).toBeInTheDocument();
  expect(screen.getByText(/Pokemon Name/i)).toBeInTheDocument();
});
