import Link from "next/link"
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegSun, FaRegMoon } from 'react-icons/fa'
import { useRouter } from "next/router";

export default function Nav() {
    const [, setDarkToggle] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isHome, setIsHome] = useState(false)
    const router = useRouter()

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", function (e) {
            setIsChecked(e.matches ? true : false)
        });
        setIsChecked(window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false)
        if (router.pathname === '/') {
            setIsHome(true)
            return
        } else {
            setIsHome(false)
            return
        }
    }, [])

    useEffect(() => {
        const root = document.getElementsByTagName('html')[0];

        if (isChecked === true) {
            root?.setAttribute("class", "dark");
            setDarkToggle(true)
            return
        }

        if (isChecked === false) {
            root?.setAttribute("class", "");
            setDarkToggle(false)
            return
        }

    }, [isChecked])

    return (
        <div className="bg-yellow-400 dark:bg-cyan-800 rounded-xl m-2 drop-shadow-xl">
            <nav className="flex justify-between mx-5 py-2 md:py-4 items-center">
                <p className="text-xl font-black my-0 md:text-2xl tracking-tight"><Link href={"/"} legacyBehavior><a className="flex flex-col md:flex-row sm:gap-2 capitalize"><Image src="/logo.jpg" width={100} height={10} className="w-10 drop-shadow-md md:w-24" alt="icon of a nissan 300zx from 1986." priority />z-chronicles</a></Link></p>
                <ul className="flex gap-5">
                    {isHome ?
                        <></>
                        :
                        <><li className="font-medium flex items-center"><Link href={"/posts"} legacyBehavior><a>Posts</a></Link></li><li className="font-medium flex items-center"><Link href={"/about"} legacyBehavior><a>About</a></Link></li></>
                    }
                    <li>
                        <div className="flex items-center justify-center">
                            <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" id="toggleB" className="sr-only" onChange={(event) => setIsChecked(event.currentTarget.checked)}
                                        checked={isChecked} role='' />
                                    <div className="block dark:bg-neutral-800 bg-neutral-100 dark:bg-opacity-80 bg-opacity-80 drop-shadow-xl w-14 h-8 rounded-full"></div>
                                    <div className="dot absolute left-1 top-1 w-6 h-6 rounded-full transition flex items-center justify-center bg-yellow-400">{isChecked ? <FaRegMoon /> : <FaRegSun />}</div>
                                </div>
                            </label>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}