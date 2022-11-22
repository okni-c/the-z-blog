import { type NextPage } from "next";
import Nav from "../../components/Nav"
import Head from "next/head";
import PostsList from "../../components/PostsList"
import Footer from "../../components/Footer";

const Posts: NextPage = () => {
    return (
        <>
            <Head>
                <title>The Z-Blog | Posts</title>
                <meta name="description" content="Latests posts of the 1986 Nissan 300zx joureny!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <main>
                <h1 className="text-5xl font-bold tracking-tight text-center">
                    All Posts
                </h1>
                <PostsList />
            </main>
            <Footer />
        </>
    )
}

export default Posts;