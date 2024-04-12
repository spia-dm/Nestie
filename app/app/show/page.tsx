"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import '../globals.css'
import Image from 'next/image'

const Show = () => {
  const session = useSession()
  console.log(session.status)
  const router = useRouter()
  const [profile_box_visible, set_profile_box_visible] = useState(false)

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
          <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGM2dnBtOHhtOWZiaXhxY2htamJzdmRwbnU1NDlya2NvdXIwZTdydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/CbZwu25CGwNw9awRNt/giphy.gif" alt="loading" />
        </div>
    )
  }
  if (session.status === "unauthenticated") {
    router.push('/')
  }
  const show_profile_box=()=>{
    set_profile_box_visible(!profile_box_visible)
  }
  const handleSignOut = async () => {
    await signOut();
    router.push('/')
  };
  return (
    <div className="bg-[#B5C0D0] h-screen flex flex-col">
      <div className="bg-[#3E3232] min-h-16 max-h-16">
        <div className="flex justify-center flex-grow">
          <h2 className="font-josefin_slab text-5xl text-[#B5C0D0] underline text-outline-black2 mt-2 ">PropertEase</h2>
        </div>
        <div className="flex justify-end">
  <button className="-mt-20 w-12" onClick={()=>{router.push("/upload-home")}}>
    <img src="https://i.ibb.co/42D8xXF/home-add-svgrepo-com.png" alt="upload home"></img>
  </button>
  <button onClick={show_profile_box} className="scale-50 -mt-20 pt-1">
    <img className="rounded-full border-[#B5C0D0] border-4" src={session.data.user.image} alt="avatar"/>
  </button>
</div>


      </div>
      <div className="w-6/12 top-16 fixed left-[87vw]">
      {profile_box_visible && (
        <div className="border-[#3E3232] rounded-xl bg-[#CCD3CA] bg-opacity-30 border-2 h-48 w-3/12 text-[#3E3232] text-center font-josefin_slab text-2xl mr-1 z-10 flex flex-col">
        <button className="mt-8" onClick={() => router.push('/profile')}>Profile</button>
        <button className="mt-8" onClick={handleSignOut}>Sign Out</button>
      </div>
      )}
      </div>
    </div>
  );
};

export default Show;
