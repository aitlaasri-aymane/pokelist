import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  Progress,
  Badge,
  Card,
  Heading,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { PokeType } from "../redux/pokemons/types";
import { FaWeightHanging } from "react-icons/fa";
import { MdHeight } from "react-icons/md";

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: PokeType;
}

const PokemonModal: React.FC<PokemonModalProps> = ({
  isOpen,
  onClose,
  pokemon,
}) => {
  const { colorMode } = useColorMode();
  const abilityColors = ["pink", "yellow", "blue", "orange", "cyan", "teal"];
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        className={`${
          colorMode === "dark" && "saturate-[0.8] brightness-[0.8]"
        }`}
      >
        <ModalHeader
          style={{
            backgroundColor: `var(--bg-poke-color-${pokemon.types[0].type.name})`,
            borderRadius:
              "var(--chakra-radii-md) var(--chakra-radii-md) 0px 0px",
          }}
          className="relative"
        >
          <div className="p-6 flex justify-between flex-wrap h-44">
            <div className="flex justify-between w-full">
              <div className="flex gap-2 items-center h-fit">
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
                    <span className="drop-shadow-md">{type.type.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
            <Heading
              noOfLines={1}
              size="lg"
              className={`text-center basis-full absolute !m-0 left-0 top-20 w-full`}
            >
              {pokemon.name.replaceAll("-", " ").toUpperCase()}
            </Heading>
            <div className="mt-auto flex justify-between basis-full">
              <Tag
                data-testid="weight-tag"
                className={`drop-shadow-md !rounded-full ${
                  colorMode === "dark" ? "variant-solid" : "variant-subtle"
                }`}
                variant={colorMode === "dark" ? "solid" : "subtle"}
              >
                <TagLeftIcon
                  className="drop-shadow-md"
                  boxSize="12px"
                  as={FaWeightHanging}
                />
                <TagLabel className="drop-shadow-md">{pokemon.weight}</TagLabel>
              </Tag>
              <Tag
                data-testid="height-tag"
                className={`drop-shadow-md !rounded-full ${
                  colorMode === "dark" ? "variant-solid" : "variant-subtle"
                }`}
                variant={colorMode === "dark" ? "solid" : "subtle"}
              >
                <TagLeftIcon
                  className="drop-shadow-md"
                  boxSize="12px"
                  as={MdHeight}
                />
                <TagLabel className="drop-shadow-md">{pokemon.height}</TagLabel>
              </Tag>
            </div>
            <Card className="!rounded-full z-[10] !absolute top-32 left-[calc(50%-5rem)] w-40 h-40">
              <img
                src={
                  pokemon.sprites["front_default"]
                    ? pokemon.sprites["front_default"]
                    : "./pokeball.svg"
                }
                alt={
                  pokemon.sprites["front_default"]
                    ? "front_default"
                    : "pokeball"
                }
              />
            </Card>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant="soft-rounded">
            <TabList className="!flex !justify-between">
              <Tab>Stats</Tab>
              <Tab>Abilities</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="flex flex-col justify-between gap-2 mt-6">
                  {pokemon.stats.map((stat, index) => (
                    <div key={index} className="flex flex-col">
                      <Progress
                        colorScheme={abilityColors[index]}
                        className="rounded-full"
                        value={stat.base_stat}
                      />
                      <span>
                        {stat.stat.name.replaceAll("-", " ").toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="flex flex-col justify-center gap-2 mt-6 text-center">
                  {pokemon.abilities.map((ability, index) => (
                    <span key={index} className="font-bold">
                      {ability.ability.name.replaceAll("-", " ").toUpperCase()}
                    </span>
                  ))}
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonModal;
