"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import {useRouter} from 'next/navigation'

const Home = () => {
  const session = useSession()
  const router = useRouter()
  const [profile_box_visible, set_profile_box_visible] = useState(false)
  if (session.status === "loading") {
    return <h2>loading ...</h2>
  }
  if (session.status === "unauthenticated") {
    router.push('/')
  }
  console.log(session);
  const show_profile_box=()=>{
    set_profile_box_visible(!profile_box_visible)
  }
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <div className="bg-[#B5C0D0] h-screen flex flex-col">
      <div className="bg-[#3E3232] min-h-16 max-h-16">
        <div className="flex justify-center flex-grow">
          <h2 className="font-josefin_slab text-5xl text-[#B5C0D0] underline text-outline-black2 mt-2">PropertEase</h2>
        </div>
        <div className="flex justify-end">
          <button onClick={show_profile_box}><svg className="h-12 mr-4 -mt-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#B5C0D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
        </div>
      </div>
      <div className="flex justify-center">
        <input className="border-[#3E3232] border-b-2 bg-transparent text-3xl font-josefin_slab text-center w-4/12 mt-16 placeholder:text-gray-500 text-[#3E3232] outline-none" type="text" placeholder="Search ..."></input>
        <button className="text-3xl mt-16 border-2 border-black w-1/12">Search</button>
      </div>
      <div className="flex justify-end">
      {profile_box_visible && (
        <div className="border-[#3E3232] rounded-xl bg-[#CCD3CA] border-2 h-48 w-3/12 text-[#3E3232] text-center font-josefin_slab text-2xl -mt-4 mr-1">
        <h2 className="mt-2">Profile</h2>
        <h2 className="mt-2">Settings</h2>
        <h2 className="mt-2">My Uploads</h2>
        <button className="mt-2" onClick={handleSignOut}>Sign Out</button>
      </div>
      )}
      </div>
    </div>
  );
};

export default Home;
