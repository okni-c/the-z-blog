import Image from "next/image";
import Link from "next/link";
import { trpc } from "../utils/trpc";

export default function HomeList() {

    const posts = trpc.get.newestPosts.useQuery();

    if (posts === null) {
        return (
            <h1>
                Loading...
            </h1>
        );
    }

    return (
        <section className="flex flex-wrap justify-center gap-5">
            {posts.data?.map((post, i) =>
                <Link key={i} href={'/posts/' + post.slug} style={{ textDecoration: 'none', maxWidth: '350px', maxHeight: '400px' }}>
                    <div className="md:hover:scale-105 duration-150 ease-in-out dark:bg-cyan-700 bg-yellow-500 rounded-xl w-60 md:w-72 h-full relative drop-shadow-xl">
                        <Image src={post.thumbnail || '/blur.jpg'} width={300} height={300} className="rounded-t-xl aspect-square object-cover drop-shadow-lg" alt="Post thumbnail" priority />
                        <h3 className="m-0 font-extrabold tracking-tight px-3 py-2 mb-7 text-xl md:text-2xl">{post.title}</h3>
                        <p className="m-0 absolute bottom-2 left-3 font-medium">Posted: {post.Date}</p>
                    </div>
                </Link>
            )}
        </section>
    );
}