export interface PokemonListResponse {
    count:    number;
    next:     string;
    previous: null|string;
    results:  SmallPokemon[];
}

export interface SmallPokemon {
    name: string;
    url:  string;
    id?: number;
    img?: string;
}
