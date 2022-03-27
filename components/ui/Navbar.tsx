import { Button, Link, Row, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

export const Navbar: FC = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <NextLink href={"/"} passHref>
        <Link>
          <Row justify="flex-start" align="center">
            <Image
              width={70}
              height={70}
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            />
            <Text color="white" h2>
              P
            </Text>
            <Text color="white" h3>
              okémon
            </Text>
          </Row>
        </Link>
      </NextLink>

      <NextLink href={"/favorites"} passHref>
        <Link>
          <Button color="gradient">Ir a favoritos</Button>
        </Link>
      </NextLink>
    </div>
  );
};
