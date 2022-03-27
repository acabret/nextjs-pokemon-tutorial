import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import FavoritePokemons from "../../components/pokemon/favoritePokemons";
import NoFavorites from "../../components/ui/NoFavorites";
import { favoritePokemon } from "../../utils";

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    const pokemons = favoritePokemon.pokemons();
    setFavoritePokemons(pokemons);
  }, []);

  return (
    <Layout title="Favoritos">
      <h2>pagina de favoritos</h2>

      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons pokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
