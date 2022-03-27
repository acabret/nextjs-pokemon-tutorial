import { Button, Card, Container, Grid, Row, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { PokemonSpec } from "../../interfaces";
import { favoritePokemon, getPokemonInfo } from "../../utils";
import confetti from "canvas-confetti";
import { useRouter } from "next/router";

interface Props {
  pokemon: PokemonSpec;
}

const obtenerPokemons = (): number[] => {
  const pokemonsIds: number[] = JSON.parse(
    window.localStorage.getItem("favoritePokemons") || "[]"
  );

  return pokemonsIds;
};

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [esFavorito, setEsFavorito] = useState(
    favoritePokemon.isFavorite(pokemon.id)
  );
  const router = useRouter();

  // useEffect(() => {
  //   setEsFavorito(favoritePokemon.isFavorite(pokemon.id));
  // }, []);

  const onToggleFavorite = () => {
    favoritePokemon.toggleFavorite(pokemon.id);
    const esFavorito = favoritePokemon.isFavorite(pokemon.id);

    if (esFavorito) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 0.7,
          y: 0.2,
        },
      });
    }

    setEsFavorito(esFavorito);
  };

  return (
    <Layout title={pokemon.name} image={pokemon.sprites.other?.dream_world.front_default} path={router.asPath}>
      <Grid.Container gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={`Imagen del pokémon ${pokemon.name} `}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button
                ghost={esFavorito}
                color="gradient"
                onClick={onToggleFavorite}
              >
                {esFavorito ? "Eliminar de favoritos" : "Guardar en favoritos"}
              </Button>
              {/* {esFavorito && (
                <Button ghost color="gradient" onClick={onToggleFavorite}>
                  Eliminar de favoritos
                </Button>
              )}

              {!esFavorito && (
                <Button color="gradient" onClick={onToggleFavorite}>
                  Guardar en favoritos
                </Button>
              )} */}
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites</Text>
              {/* <Container> */}
              <Row>
                <Card.Image
                  src={pokemon.sprites.front_default || "/no-image.png"}
                  alt={`Imagen del pokémon ${pokemon.name} `}
                  width={100}
                  height={100}
                />
                <Card.Image
                  src={pokemon.sprites.back_default || "/no-image.png"}
                  alt={`Imagen del pokémon ${pokemon.name} `}
                  width={100}
                  height={100}
                />
                <Card.Image
                  src={pokemon.sprites.front_shiny || "/no-image.png"}
                  alt={`Imagen del pokémon ${pokemon.name} `}
                  width={100}
                  height={100}
                />
                <Card.Image
                  src={pokemon.sprites.back_shiny || "/no-image.png"}
                  alt={`Imagen del pokémon ${pokemon.name} `}
                  width={100}
                  height={100}
                />
              </Row>
              {/* </Container> */}
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

//esta function genera las paths que se usaran en el SSG
//por cada una de estas paths, se llamara a getStaticProps, proporcionando
//los params a getStaticProps al argumentos de la función
export const getStaticPaths: GetStaticPaths = () => {
  const pokemon151 = [...Array(151)].map(
    (item: any, index: number) => `${index + 1}`
  );
  const paths: { params: { id: string } }[] = pokemon151.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as { id: string };
  // const { data } = await pokeApi.get<PokemonSpec>(`/pokemon/${id}`);
  const pokemon = await getPokemonInfo(id);

  return {
    props: {
      pokemon,
    },
  };
};

export default PokemonPage;
