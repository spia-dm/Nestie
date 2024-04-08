"use client"
import {useState} from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import {useRouter} from 'next/navigation'
const Profile=()=>{
    const session=useSession()
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
  };
    return(
        <div className="bg-[#B5C0D0] h-screen flex flex-col">
        <div className="bg-[#3E3232] min-h-16 max-h-16">
        <div className="flex justify-center flex-grow">
          <h2 className="font-josefin_slab text-5xl text-[#B5C0D0] underline text-outline-black2 mt-2 ">PropertEase</h2>
        </div>
        <div className="flex justify-end">
          <button onClick={show_profile_box}><svg className="h-12 mr-4 -mt-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#B5C0D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
        </div>
      </div>
      <div className="w-6/12 top-16 fixed left-[87vw]">
      {profile_box_visible && (
        <div className="border-[#3E3232] rounded-xl bg-[#CCD3CA] border-2 h-24 w-3/12 text-[#3E3232] text-center font-josefin_slab text-2xl mr-1 z-10 flex flex-col">
        <button className="mt-8" onClick={handleSignOut}>Sign Out</button>
      </div>
      )}
      </div>
        </div>
    )
}
export default Profile