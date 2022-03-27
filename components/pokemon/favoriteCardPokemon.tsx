import { Card, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  pokemonId: number;
}

const FavoritePokemonCard: FC<Props> = ({ pokemonId }) => {

  const router = useRouter()

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${pokemonId}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} onClick={onFavoriteClicked}>
      <Card hoverable clickable css={{ padding: "10" }}>
        <Card.Body>
          <Card.Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
            width="100%"
            height={140}
          />
        </Card.Body>
        {/* <Card.Footer>
      <Row justify="space-between">
        <Text transform="capitalize">{name}</Text>
        <Text>#{id}</Text>
      </Row>
    </Card.Footer> */}
      </Card>
    </Grid>
  );
};

export default FavoritePokemonCard;
