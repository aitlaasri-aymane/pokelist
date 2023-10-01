import { render, screen } from "@testing-library/react";
import PokemonCard from "../components/PokemonCard";
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

describe("PokemonCard", () => {
  it("should render the card with Pokemon details", () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText(/Pokemon Name/i)).toBeInTheDocument();
    expect(screen.getByAltText(/front_default/i)).toBeInTheDocument();
    expect(screen.getByText(/normal/i)).toBeInTheDocument();
  });

  it("should render order with 4 digits only if positive", () => {
    render(<PokemonCard pokemon={mockPokemonNegativeOrder} />);

    expect(screen.getByText(/-1/i)).toBeInTheDocument();
  });

  it("should render the card in dark mode", () => {
    render(
      <DarkMode>
        <PokemonCard pokemon={mockPokemon} />
      </DarkMode>
    );
    expect(screen.getByTestId("name-heading")).toHaveClass("saturate-[0.8]");
    expect(screen.getByTestId("card-header")).toHaveClass("saturate-[0.8]");
  });

  it("should render the card in light mode", () => {
    render(
      <LightMode>
        <PokemonCard pokemon={mockPokemon} />
      </LightMode>
    );
    expect(screen.getByTestId("name-heading")).not.toHaveClass(
      "saturate-[0.8]"
    );
    expect(screen.getByTestId("card-header")).not.toHaveClass("saturate-[0.8]");
  });

  it("should render the modal with fallback image", () => {
    render(<PokemonCard pokemon={mockPokemonNoImage} />);

    expect(screen.getByAltText(/pokeball/i)).toBeInTheDocument();
  });
});
