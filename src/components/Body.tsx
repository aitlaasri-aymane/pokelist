import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PageState } from "../redux/pokemonPage/types";
import { PokeState } from "../redux/pokemons/types";
import PokemonCard from "./PokemonCard";
import { Alert, AlertIcon, ScaleFade } from "@chakra-ui/react";
import CardSkeleton from "./CardSkeleton";
import { useDispatch } from "react-redux";
import { getPageAction } from "../redux/pokemonPage/slice";

type BodyProps = {
  page: PageState;
  pokemons: PokeState[];
  limit: number;
};

const Body: React.FC<BodyProps> = ({ page, pokemons, limit }) => {
  const dispatch = useDispatch();
  return (
    <InfiniteScroll
      dataLength={pokemons.length}
      next={() => dispatch(getPageAction({ limit, next: page.data.next }))}
      hasMore={page.data.next !== null}
      loader={
        <div className="flex gap-5 flex-wrap justify-center items-center p-2">
          {Array.from(Array(3).keys()).map((i) => (
            <CardSkeleton key={i} keyId={i} />
          ))}
        </div>
      }
      endMessage={
        <Alert className="my-3 rounded-full" status="success">
          <AlertIcon />
          You have seen all the pokemons!
        </Alert>
      }
    >
      <div className="flex gap-5 flex-wrap justify-center items-center p-2">
        {pokemons.map((pokemonState, index) => {
          if (pokemonState.loading === true)
            return <CardSkeleton key={index + "skeleton"} keyId={index} />;
          else
            return (
              <PokemonCard
                key={pokemonState.data.id}
                pokemon={pokemonState.data}
              />
            );
        })}
      </div>
    </InfiniteScroll>
  );
};

export default Body;
