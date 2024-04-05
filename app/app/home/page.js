import Link from 'next/link';
const Home = () => {
  return (
    <div className="bg-[#B5C0D0] h-screen flex flex-col">
      <nav className="bg-[#3E3232] h-16 flex justify-end items-center px-4">
        <Link href="/signin" className="rounded-3xl text-3xl font-josefin_slab bg-[#625757] pl-3 p-2 pr-3 mr-2 text-[#CCD3CA] font-bold transition-all duration-300 ease-in-out active:bg-opacity-20">
          Log In
        </Link>
        <Link href="/signup" className="rounded-3xl text-3xl font-josefin_slab bg-[#B5C0D0] pl-3 p-2 pr-3 text-[#625757] font-bold active:bg-[#9CAFAA] hover:text-outline-black transition-all duration-300 ease-in-out">
          Get Started
        </Link>
      </nav>
      <div>
        <h2 className="font-josefin_slab text-center text-5xl text-[#B5C0D0]">PropertEase</h2>
      </div>
    </div>
  );
};

export default Home;