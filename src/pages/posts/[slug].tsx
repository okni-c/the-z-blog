import { type NextPage } from "next";
import Nav from "../../components/Nav"
import Image from "next/image"
import { BsFillPersonFill } from 'react-icons/bs'
import { FaCalendarAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'
import DOMPurify from 'isomorphic-dompurify';
import { trpc } from "../../utils/trpc";
import Head from "next/head";

const PostPage: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const string : any = slug;
    const post = trpc.get.postBySlug.useQuery(string);
    if (post.data === undefined) {
        return (
            <>
                <Nav />
                <h1>Loading...</h1>
            </>
        );
    }
    return (
        <>
            <Head>
                <title>The Z-Blog | {post.data?.title}</title>
                <meta name="description" content="Blog post about the 1986 Nissan 300zx project car!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <main>
                <header className="flex flex-col sm:flex-row sm:justify-between sm:mb-5 sm:mt-2 mt-2 mb-3">
                    <h1 className="flex items-center">{post.data?.title}</h1>
                    <div className="flex justify-between items-center sm:flex-col sm:justify-center flex-wrap gap-1 sm:gap-0">
                        <p className="author-pill"><BsFillPersonFill className="mr-1" /> {post.data?.author}</p>
                        <p className="date-pill"><FaCalendarAlt className="mr-1" /> {post.data?.Date}</p>
                    </div>
                </header>
                <hr className="bg-neutral-700 h-2 rounded-full border-none" />
                <section className="max-w-[1000px] w-full my-6 mx-auto">
                    <Image src={post.data?.thumbnail || ''} width={1000} height={500} className="rounded-xl mx-auto aspect-video object-cover drop-shadow-lg hover:xl:scale-105 hover:xl:my-4 ease-in-out duration-150" alt="Evan leaning over the engine bay, adjusting the new battery terminal." priority />
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.data?.body || '<p>No data</p>')}} />
                </section>
            </main>
        </>
    )
}

export default PostPage;
