"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import {redirect} from 'next/navigation'
const Home = () => {
  const session =useSession();
  console.log(session);
  if(session.status ==="loading"){
    return <p>Loading....</p>
  }
  if(session.status ==="unauthenticated"){
      redirect('/')
  }

  return (
    <div className="bg-[#B5C0D0] h-screen flex flex-col">
      <div className="bg-[#3E3232] min-h-16 max-h-16">
        <div className="flex justify-center flex-grow">
          <h2 className="font-josefin_slab text-5xl text-[#B5C0D0] underline text-outline-black2 mt-2">PropertEase</h2>
        </div>
        <div className="flex flex-row justify-end -mt-11 mb-2 mr-2">
        </div>
      </div>
    </div>
  );
};

export default Home;
