import { type NextPage } from "next";
import Head from "next/head";
import Nav from "../../components/Nav";
import Footer from '../../components/Footer';
import HomeList from "../../components/HomeList";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Z-Chronicles | About</title>
        <meta name="description" content="Follow the journey of the 1986 Nissan 300zx!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="flex flex-col justify-start">
        <div className="my-8 md:mt-14 text-center">
          <h1 className="text-4xl md:text-6xl drop-shadow-lg">
            about <span className="dark:text-red-600 text-red-500">the Z</span>
          </h1>
          <p className="text-lg md:text-xl font-semibold">and many other things</p>
        </div>
        <div className="my-8 md:my-14 max-w-[1000px] w-full mx-auto">
          <h3>The Car</h3>

          <p>Welcome to my blog, where I share the heartwarming story of how I rescued my 1986 Nissan 300ZX from my friend Reed. When I first laid eyes on this car, it looked like it had seen better days, like a retired racehorse who had given its all. But I saw potential in it, like a forgotten masterpiece waiting to be restored.</p>

          <img src="/about-imgs/IMG_5764.png" className="rounded-xl mx-auto aspect-video object-cover drop-shadow-lg w-full my-8" />

          <p>Over time, I've poured my heart and soul into this car, fixing it up piece by piece, until it's almost as good as new. It hasn't been an easy journey, mind you. I've had to get creative with some of the repairs, like using duct tape and prayer to hold things together. But every time I get behind the wheel and hear the engine roar to life, it makes it all worth it.</p>

          <p>Now, my ultimate goal is to take this car on the road trip of a lifetime. I want to hit the open road, with the wind in my hair and the sun on my face, and see where this car takes me. I want to make memories that will last a lifetime, and prove that even an old car can still have plenty of life left in it. So join me on this adventure, as I embark on a journey to restore a car that's older than most people's first cell phone, and show the world that sometimes, the best things in life are the ones that require a little extra love and attention.</p>
        </div>
        <div className="my-8 md:my-14 max-w-[1000px] w-full mx-auto">
          <h3>The Owner</h3>

          <p><span className="font-semibold">Hey there,</span> welcome to my blog! As someone who is passionate about cars, music, and technology, I'm excited to share my experiences with you. Over the years, I've owned and modded more than 15 different cars, each with its unique story and challenges. While I've always been a fan of the Mazda Miata, I decided to take on a new challenge and restore a 1986 Nissan 300ZX.</p>

          <img src="/about-imgs/IMG_6330.jpg" className="rounded-xl mx-auto aspect-video object-cover drop-shadow-lg w-full my-8" />

          <p>When I'm not in the garage, I'm either making music or working on web development. I'm an self proclaimed audio engineer who uses Ableton to create new sounds and beats that move people. Music and cars share a common ground of creativity, patience, and attention to detail, which is why I enjoy both equally.</p>

          <p>As a front-end developer, I enjoy creating websites that provide great user experiences. From intuitive designs to seamless navigation, my goal is to create a web environment that users will enjoy.</p>

          <p>Overall, I'm just a regular guy with a passion for cars, music, and technology. I'm confident in my abilities and excited to share my knowledge and experiences with you. So, join me on this journey as we explore the world of cars, music, and technology together!</p>

        </div>
        <div className="my-8 md:my-14 flex flex-col justify-center">
          <h2 className="mx-auto">Check out the latest posts!</h2>
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
