import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonModal from "../components/PokemonModal";
import { PokeType } from "../redux/pokemons/types";
import { DarkMode, LightMode } from "@chakra-ui/react";

const mockPokemon: PokeType = {
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
};

const mockPokemonNoImage: PokeType = {
  ...mockPokemon,
  sprites: {
    front_default: "",
    back_default: "",
  },
};

const mockPokemonNegativeOrder: PokeType = {
  ...mockPokemon,
  order: -1,
};

describe("PokemonModal", () => {
  it("should render the modal with Pokemon details", () => {
    render(
      <PokemonModal isOpen={true} onClose={() => {}} pokemon={mockPokemon} />
    );

    expect(screen.getByText(/Pokemon Name/i)).toBeInTheDocument();
    expect(screen.getByAltText(/front_default/i)).toBeInTheDocument();
    expect(screen.getByText(/normal/i)).toBeInTheDocument();
    expect(screen.getByText(/ability1/i)).toBeInTheDocument();
    expect(screen.getByText(/stat1/i)).toBeInTheDocument();
  });

  it("should render the modal with ability tabs", () => {
    render(
      <PokemonModal isOpen={true} onClose={() => {}} pokemon={mockPokemon} />
    );

    expect(screen.getByText(/Stats/i)).toBeInTheDocument();
    expect(screen.getByText(/Abilities/i)).toBeInTheDocument();
  });

  it("should render order with 4 digits only if positive", () => {
    render(
      <PokemonModal
        isOpen={true}
        onClose={() => {}}
        pokemon={mockPokemonNegativeOrder}
      />
    );

    expect(screen.getByText(/-1/i)).toBeInTheDocument();
  });

  it("should render the modal in dark mode", () => {
    render(
      <DarkMode>
        <PokemonModal isOpen={true} onClose={() => {}} pokemon={mockPokemon} />
      </DarkMode>
    );
    expect(screen.getByTestId("height-tag")).toHaveClass("variant-solid");
  });

  it("should render the modal in light mode", () => {
    render(
      <LightMode>
        <PokemonModal isOpen={true} onClose={() => {}} pokemon={mockPokemon} />
      </LightMode>
    );
    expect(screen.getByTestId("weight-tag")).toHaveClass("variant-subtle");
  });

  it("should render the modal with fallback image", () => {
    render(
      <PokemonModal
        isOpen={true}
        onClose={() => {}}
        pokemon={mockPokemonNoImage}
      />
    );

    expect(screen.getByAltText(/pokeball/i)).toBeInTheDocument();
  });
});
