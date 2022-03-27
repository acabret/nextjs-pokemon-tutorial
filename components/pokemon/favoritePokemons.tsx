import { Card, Grid } from "@nextui-org/react";
import { FC } from "react";
import FavoritePokemonCard from "./favoriteCardPokemon";

interface Props {
  pokemons: number[];
}

const FavoritePokemons: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} justify="flex-start" direction="row">
      {pokemons.map((id) => (
        <FavoritePokemonCard key={id} pokemonId={id} />
      ))}
    </Grid.Container>
  );
};

export default FavoritePokemons;
