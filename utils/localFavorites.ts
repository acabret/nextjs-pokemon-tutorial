const toggleFavorite = (pokemonId: number) => {
  let pokemonsIds = JSON.parse(
    window.localStorage.getItem("favoritePokemons") || "[]"
  );
  const esFavorito = pokemonsIds.includes(pokemonId);
  if (esFavorito) {
    pokemonsIds = pokemonsIds.filter((id: number) => id !== pokemonId);
  } else {
    pokemonsIds.push(pokemonId);
  }

  window.localStorage.setItem("favoritePokemons", JSON.stringify(pokemonsIds));
};

const isFavorite = (id: number): boolean => {
  if (typeof window === "undefined") return false;

  let pokemonsIds = JSON.parse(
    window.localStorage.getItem("favoritePokemons") || "[]"
  );
  return pokemonsIds.includes(id);
};

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem("favoritePokemons") || "[]");
};

export default {
  toggleFavorite,
  isFavorite,
  pokemons,
};
