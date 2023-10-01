import React from "react";
import { PokeType } from "../redux/pokemons/types";
import {
  Box,
  Card,
  Heading,
  useColorMode,
  Badge,
  ScaleFade,
  useDisclosure,
} from "@chakra-ui/react";
import PokemonModal from "./PokemonModal";

const PokemonCard: React.FC<{ pokemon: PokeType }> = ({ pokemon }) => {
  const { colorMode } = useColorMode();

  function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div
      key={pokemon.id}
      data-cy={"pokemon-card-" + pokemon.id}
      className="basis-[100%] min-[450px]:basis-[30%] flex justify-center"
      onClick={onOpen}
    >
      <ScaleFade className="max-[450px]:w-full" initialScale={0.9} in={true}>
        <Card
          align="center"
          variant="elevated"
          className="w-full min-[450px]:w-[23rem] h-[12rem] flex flex-row relative duration-300 hover:scale-[1.05] hover:cursor-pointer"
        >
          <Box
            data-testid="card-header"
            style={{
              backgroundColor: `var(--bg-poke-color-${pokemon.types[0].type.name})`,
              borderRadius: "var(--card-radius) var(--card-radius) 0px 0px",
            }}
            className={`w-full h-[50%] p-5 flex justify-between ${
              colorMode === "dark" && "saturate-[0.8] brightness-[0.8]"
            }`}
          >
            <div className="flex gap-2">
              <img className="w-6 h-6" src="./pokeball.svg" alt="" />
              <span>
                #{" "}
                {pokemon.order < 0
                  ? pokemon.order
                  : String(pokemon.order).padStart(4, "0")}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {pokemon.types.map((type, index) => (
                <Badge
                  variant="solid"
                  key={index}
                  colorScheme="green"
                  style={{
                    backgroundColor: `var(--bg-poke-color-${type.type.name})`,
                  }}
                  className={`text-center !text-white drop-shadow-md ${
                    colorMode === "dark" && "saturate-[1.5]"
                  }`}
                >
                  <span className="drop-shadow-md">
                    {capitalizeFirstLetter(type.type.name)}
                  </span>
                </Badge>
              ))}
            </div>
          </Box>
          <Card className="!rounded-full z-[10] !absolute top-[20%] w-24 h-24">
            <img
              data-cy={"pokemon-card-img-" + pokemon.id}
              src={
                pokemon.sprites["front_default"]
                  ? pokemon.sprites["front_default"]
                  : "./pokeball.svg"
              }
              alt={
                pokemon.sprites["front_default"] ? "front_default" : "pokeball"
              }
            />
          </Card>
          <Heading
            data-testid="name-heading"
            noOfLines={1}
            size="lg"
            className={`!mx-4 !mt-auto !mb-4 text-center ${
              colorMode === "dark" && "saturate-[0.8] brightness-[0.8]"
            }`}
          >
            {capitalizeFirstLetter(pokemon.name).replaceAll("-", " ")}
          </Heading>
        </Card>
      </ScaleFade>
      <PokemonModal isOpen={isOpen} onClose={onClose} pokemon={pokemon} />
    </div>
  );
};

export default PokemonCard;
