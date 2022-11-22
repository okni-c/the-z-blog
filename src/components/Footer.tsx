import Link from "next/link"
import Image from "next/image";

export default function Footer() {

    return (
        <footer className="bg-yellow-400 dark:bg-cyan-800 rounded-xl m-2 drop-shadow-xl">
            <nav className="flex justify-between mx-5 py-2 md:py-4 items-center">
                <p className="text-xl font-black my-0 md:text-2xl tracking-tight"></p>
                <ul className="flex gap-5">
                    <li className="font-medium flex items-center"><Link href={"/posts"} legacyBehavior><a>GitHub</a></Link></li>
                </ul>
            </nav>
        </footer>
    );
}