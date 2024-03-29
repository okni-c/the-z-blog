import { type NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav"
import Footer from '../components/Footer'
import Image from "next/image";
import Link from "next/link";
import HomeList from "../components/HomeList";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Z-Chronicles | Home</title>
        <meta name="description" content="Follow the journey of the 1986 Nissan 300zx!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="flex flex-col justify-start">
        <div className="my-8 md:my-14 text-center">
          <Image src="/logo.jpg" width={150} height={500} className="mx-auto aspect-video object-contain m-0 p-0" alt='red car icon' priority />
          <h1 className="text-4xl md:text-6xl drop-shadow-lg">
            the z-<span className="dark:text-red-600 text-red-500">chronicles</span>
          </h1>
          <p className="text-lg md:text-xl font-semibold">follow the journey of my 1986 Nissan 300zx</p>
          <div className="flex flex-row justify-center gap-10 mt-10">
            <Link href={'/posts'} legacyBehavior><a className="dark:text-white bg-yellow-400 dark:bg-cyan-700 py-3 px-6 rounded-full font-black text-md md:text-lg hover:no-underline md:hover:scale-110 ease-in-out duration-150 dark:hover:bg-cyan-800 hover:bg-yellow-500 w-32 whitespace-nowrap">All Posts</a></Link>
            <Link href={'/about'} legacyBehavior><a className="dark:text-white bg-yellow-400 dark:bg-cyan-700 py-3 px-6 rounded-full font-black text-md md:text-lg hover:no-underline md:hover:scale-110 ease-in-out duration-150 dark:hover:bg-cyan-800 hover:bg-yellow-500 w-32 whitespace-nowrap">About</a></Link>
          </div>
        </div>
        <div className="my-8 md:my-14 flex flex-col justify-center">
          <h2 className="mx-auto">Latest Posts</h2>
          <div className="mt-6">
            <HomeList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
