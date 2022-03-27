import { Grid } from "@nextui-org/react";
import type { NextPage, GetStaticProps } from "next";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonCard } from "../components/pokemon";
import { PokemonListResponse, SmallPokemon } from "../interfaces";

interface Props {
  pokemons: SmallPokemon[];
}

// type Pokemon = {
//   name: string;
//   url: string;
// };

const Home: NextPage<Props> = (props) => {
  return (
    <Layout title="Main Page">
      {/* <h1>Wena</h1>
      <Button color="gradient" shadow="true">
        Hey
      </Button> */}
      <Grid.Container gap={2} justify="flex-start">
        {props.pokemons.map((poke: SmallPokemon) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const { results } = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151").then((res) => res.json()); // your fetch function here
  const {
    data: { results },
  } = await pokeApi.get<PokemonListResponse>("/pokemon/?limit=151");

  // results.map(async(pokemon: SmallPokemon) => {

  //   const pokemonRequest = await pokeApi.get(`/pokemon/${pokemon.name}`)

  // } )

  const pokemons: SmallPokemon[] = results.map(
    (poke: SmallPokemon, index: number) => ({
      ...poke,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    })
  );

  // results.forEach(async (pokemon: SmallPokemon) => {
  //   const pokeReq: any = pokeApi.get(`/pokemon/${pokemon.name}`)
  //     .then(({data}) => {
  //       // console.log({data});

  //       pokemon["id"] = data.id;
  //       pokemon["img"] = data.sprites.other.dream_world["front_default"];
  //     });

  //   pokemons.push(pokeReq);
  // });

  // await Promise.all(pokemons)

  return {
    props: {
      // pokemons: results,
      pokemons,
    },
  };
};

export default Home;
