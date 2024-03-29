const Home=()=>{
return(
  <div className="bg-[#B5C0D0] h-screen">
  <nav className="bg-[#3E3232] h-16">
  <button className="mt-2 rounded-3xl text-3xl font-josefin_slab bg-[#625757] p-1 text-[#CCD3CA] font-bold pr-4 pl-4 fixed right-52 transition-all duration-300 ease-in-out active:bg-opacity-20">Log In</button>
  <button className="mt-2 rounded-3xl text-3xl font-josefin_slab bg-[#B5C0D0] p-1 text-[#625757] font-bold pr-4 pl-4 fixed right-4 active:bg-[#9CAFAA] hover:text-outline-black transition-all duration-300 ease-in-out">Get Started</button>
  </nav>
  <div>
  <h1 className="text-[#625757] text-outline-black fixed top-1/4 mt-28 left-1/4 -ml-24 text-7xl bg-[#CCD3CA] font-josefin_slab pr-8 pt-2 pl-4">InvesTrack</h1>
  <p className="text-[#625757] text-justify fixed top-1/4 mt-56 left-1/4 -ml-24 text-2xl font-josefin_slab mt-44 font-extrabold">Building &nbsp; Fortunes,&nbsp; Brick&nbsp; by&nbsp; Brick:<br></br> Your Assets, Our Investment Tracker.</p>
  <button className="text-[#625757] text-justify fixed top-1/4 mt-80 -ml-32 bg-[#CCD3CA] p-2 active:bg-[#9CAFAA] hover:text-outline-black text-3xl font-josefin_slab mt-44 font-extrabold left-1/3 transition-all duration-300 ease-in-out rounded-2xl border-[#625757] border-2">Get Started</button>
</div>

  </div>
)
}
export default Home;