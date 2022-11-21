import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { trpc } from "../utils/trpc";


export default function PostsList() {
    const [isHome, setIsHome] = useState(2)
    const router = useRouter();

    useEffect(() => {
        if (router.pathname !== '/') {
            setIsHome(20)
        }
    }, [])

    const posts = trpc.get.newestPosts.useQuery(isHome);

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
                <Link key={i} href={'/posts/' + post.slug} style={{ textDecoration: 'none', maxWidth: '350px', minHeight: '400px' }}>
                    <div className="hover:scale-105 duration-150 ease-in-out dark:bg-neutral-900 bg-neutral-300 p-5 rounded-xl w-full h-full">
                        <Image src={post.thumbnail || '/blur.jpg'} width={500} height={500} className="rounded-xl aspect-square object-cover" alt="Post thumbnail" priority />
                        <h2>{post.title}</h2>
                        <p>Posted: {post.Date}</p>
                    </div>
                </Link>
            )}
        </section>
    );
}