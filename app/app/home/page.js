import Link from 'next/link';

const Home = () => {
  return (
    <div className="bg-[#B5C0D0] h-screen flex flex-col">
      <div className="bg-[#3E3232] min-h-16 max-h-16">
        <div className="flex justify-center flex-grow">
          <h2 className="font-josefin_slab text-5xl text-[#B5C0D0] underline text-outline-black2 mt-2">PropertEase</h2>
        </div>
        <div className="flex flex-row justify-end -mt-11 mb-2 mr-2">
          <div>
            <Link href="/signin" className="rounded-3xl text-3xl font-josefin_slab bg-[#625757] pl-3 p-2 pr-3 mr-2 text-[#CCD3CA] font-bold transition-all duration-300 ease-in-out active:bg-opacity-20">
              Log In
            </Link>
          </div>
          <div>
            <Link href="/signup" className="rounded-3xl text-3xl font-josefin_slab bg-[#B5C0D0] pl-3 p-2 pr-3 text-[#625757] font-bold active:bg-[#9CAFAA] hover:text-outline-black transition-all duration-300 ease-in-out">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
