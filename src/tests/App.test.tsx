import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../redux/store";
import { configureStore } from "@reduxjs/toolkit";
import { getPageAction } from "../redux/pokemonPage/slice";
import { DarkMode, LightMode } from "@chakra-ui/react";

test("renders image pokemon image and Skeletons before loading data", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByAltText("Pokemon Logo")).toBeInTheDocument();
  expect(screen.getByTestId("skeleton-body")).toBeInTheDocument();
});

test("calls fetchData within useEffect when the component mounts", () => {
  const page = {
    data: {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
  };

  const pageState = store.dispatch(
    getPageAction({ limit: 10, next: page.data.next })
  );
  const expectedPageState = {
    payload: { limit: 10, next: null },
    type: "page/getPageAction",
  };

  expect(pageState).toEqual(expectedPageState);
});

test("renders Body component when we fetch pokemons", () => {
  const initialState = {
    page: {
      data: { count: 0, next: null, previous: null, results: [] },
      error: "",
      loading: true,
    },
    pokemons: {
      PokemonsList: {
        "Pokemon Name": {
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
          error: "",
          loading: false,
        },
      },
    },
  };

  const mockstore = configureStore({
    reducer: (state = initialState) => state,
  });
  render(
    <Provider store={mockstore}>
      <App />
    </Provider>
  );

  expect(screen.getByTestId("main-body")).toBeInTheDocument();
});

test("should render the app in dark mode", () => {
  render(
    <DarkMode>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkMode>
  );
  expect(screen.getByTestId("pokemon-logo")).toHaveClass("saturate-[0.8]");
});

test("should render the app in light mode", () => {
  render(
    <LightMode>
      <Provider store={store}>
        <App />
      </Provider>
    </LightMode>
  );
  expect(screen.getByTestId("pokemon-logo")).not.toHaveClass("saturate-[0.8]");
});
