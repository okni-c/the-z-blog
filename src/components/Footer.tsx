import Link from "next/link"
import Image from 'next/image'

export default function Footer() {

    return (
        <footer className="bg-yellow-400 dark:bg-cyan-800 rounded-xl m-2 drop-shadow-xl">
            <nav className="flex mx-5 py-4 items-center">
                <p className="text-xl font-black my-0 md:text-2xl tracking-tight"></p>
                <Image src="/logo.jpg" width={100} height={100} className="w-12 drop-shadow-md md:w-24 h-auto" alt="icon of a nissan 300zx from 1986." priority />
                <ul className="flex gap-5 ml-auto">
                    <li className="font-medium flex items-center"><Link href={"https://github.com/okni-c/the-z-blog"} legacyBehavior><a>GitHub</a></Link></li>
                </ul>
            </nav>
        </footer>
    );
}