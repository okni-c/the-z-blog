import { type NextPage } from "next";
import Nav from "../../components/Nav"
import Head from "next/head";
import PostsList from "../../components/PostsList"
import Footer from "../../components/Footer";

const Posts: NextPage = () => {
    return (
        <>
            <Head>
                <title>Z-Chronicles | Posts</title>
                <meta name="description" content="Latests posts of the 1986 Nissan 300zx joureny!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <main>
                <div className="text-center my-8 md:my-14">
                    <h1 className="text-4xl md:text-6xl drop-shadow-lg">
                        posts <span className="dark:text-red-600 text-red-500">archive</span>
                    </h1>
                    <p className="text-lg md:text-xl font-semibold">glorified documentation</p>
                </div>
                <PostsList />
            </main>
            <Footer />
        </>
    )
}

export default Posts;