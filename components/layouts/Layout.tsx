import Head from "next/head";
import { FC } from "react";
import { Navbar } from "../ui";

interface Props {
  title: string;
  image?: string;
  path?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({
  title = "Placeholder title",
  image = "no-image.png",
  path = "nourl.com",
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Alonso"></meta>
        <meta name="description" content={`Pokemon ${title}...`}></meta>
        <meta
          name="keywords"
          content={`info del pokemon ${title} para el seo`}
        ></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={ `${origin}${path}`}
        />
        <meta
          property="og:image"
          content={image}
        />
      </Head>
      <Navbar />
      <main style={{ padding: "0 20px" }}>{children}</main>
    </>
  );
};
