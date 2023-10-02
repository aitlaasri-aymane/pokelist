import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageAction } from "./redux/pokemonPage/slice";
import { PageStateType } from "./redux/pokemonPage/types";
import { PokeStateType } from "./redux/pokemons/types";
import Body from "./components/Body";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import CardSkeleton from "./components/CardSkeleton";

const App = () => {
  const page = useSelector((state: PageStateType) => state.page);
  const pokemons = useSelector((state: PokeStateType) => state.pokemons.List);
  const limit = 15;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPageAction({ limit, next: null }));
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <div className="mx-[2rem] md:mx-[2rem] lg:mx-[4rem]">
        <div className="flex w-full flex-col items-center justify-center my-2 md:flex-row md:items-normal">
          <img
            data-testid="pokemon-logo"
            className={`object-cover w-full h-full px-0 min-[550px]:px-[4rem] md:px-0 md:w-[521px] md:h-[191px]  ${
              colorMode === "dark" && "saturate-[0.8] brightness-[0.8]"
            }`}
            src="./pokemon-logo.png"
            alt="Pokemon Logo"
            loading="eager"
          />
          {colorMode && (
            <div
              className={`pokeball !hidden scale-[0.7] mt-[27px] ml-[-27px] animate-shake relative md:!block ${
                colorMode === "dark" && "saturate-[0.6] brightness-[0.8]"
              }`}
            >
              <Button
                data-cy="toggle-colormode-button"
                onClick={toggleColorMode}
                className="z-10 absolute top-[calc(50%-20px)] left-[calc(50%-20px)] !rounded-full !p-0 saturate-[1] brightness-[1]"
                colorScheme="red"
              >
                {colorMode === "light" ? (
                  <SunIcon data-cy="SunIcon" h={7} w={7} className="!m-0" />
                ) : (
                  <MoonIcon data-cy="MoonIcon" h={7} w={7} className="!m-0" />
                )}
              </Button>
            </div>
          )}
        </div>

        {pokemons.length === 0 ? (
          <div
            data-testid="skeleton-body"
            className="flex gap-5 flex-wrap justify-center items-center p-2"
          >
            {Array.from(Array(3).keys()).map((i) => (
              <CardSkeleton key={i} keyId={i} />
            ))}
          </div>
        ) : (
          <div data-testid="main-body">
            <Body page={page} pokemons={pokemons} limit={limit} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
