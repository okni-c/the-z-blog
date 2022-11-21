import { type NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav"

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>The Z-Blog | Home</title>
        <meta name="description" content="Follow the journey of the 1986 Nissan 300zx!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>
        <h1>
          h1 Welcome to the Z-Blog!
        </h1>
        <h2>
          h2 Welcome to the Z-Blog!
        </h2>
        <h3>
          h3 Welcome to the Z-Blog!
        </h3>
        <h4>
          h4 Welcome to the Z-Blog!
        </h4>
        <h5>
          h5 Welcome to the Z-Blog!
        </h5>
        <p>p Welcome to the Z-Blog!</p>
        <li>
          li Welcome to the Z-Blog!
        </li>
      </main>
    </>
  );
};

export default Home;
