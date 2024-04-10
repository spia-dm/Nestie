"use client"
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Profile = () => {
  const session = useSession()
  const router = useRouter()
  const [profileBoxVisible, setProfileBoxVisible] = useState(false)

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

  const show_profile_box= () => {
    setProfileBoxVisible(!profileBoxVisible)
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="bg-[#B5C0D0] h-screen flex flex-col">
      <div className="bg-[#3E3232] min-h-16 max-h-16">
        <div className="flex justify-center flex-grow">
          <h2 className="font-josefin_slab text-5xl text-[#B5C0D0] underline text-outline-black2 mt-2 ">PropertEase</h2>
        </div>
        <div className="flex justify-end">
        <button onClick={show_profile_box} className="scale-50 -mt-20 pt-1">
  <img className="rounded-full border-[#B5C0D0] border-4" src={session.data.user.image} alt="avatar"/>
  </button>
        </div>
      </div>
      {profileBoxVisible && (
        <div className="fixed right-0 top-16">
          <div className="border-[#3E3232] rounded-xl bg-[#CCD3CA] border-2 h-16 w-[10vw] text-[#3E3232] text-center font-josefin_slab text-2xl mr-1 z-10 flex flex-col">
            <button className="mt-4" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      )}
      <div className="grid grid-rows-2 grid-flow-col gap-4">

      <div className="row-span-1 col-span-2 ... bg-[#F5E8DD] bg-opacity-30 border-[#3E3232] border-2 border-dashed rounded-xl mt-2 ml-2 hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-300 ease-in-out">
        <h2 className="font-josefin_slab text-3xl text-[#3E3232] text-center mt-2 underline">My Data</h2>
        <div className="flex flex-row items-center justify-center text-center">
        <img className="rounded-xl w-48 mt-12 border-[#3E3232] border-4" src={session.data.user.image} alt="avatar"/>
        <div className="flex flex-col mt-12 border-black border-2 ml-8 h-48 mr-12">
        <h2 className="text-3xl text-[#3E3232] font-josefin_slab mt-4">{session.data.user.name}</h2>
        <h2 className="text-3xl text-[#3E3232] font-josefin_slab mt-4">{session.data.user.email}</h2>
        <div className="flex justify-center">
        <button className="border-black border-2"><img className="w-40" src="https://i.ibb.co/9TCmzHv/off.png" alt="2fa-off"></img></button>
        </div>
        {/*https://i.ibb.co/BfRtfc5/on.png*/}
        </div>
        </div>
      </div>

      <div className="row-span-1 col-span-2 ... bg-[#EED3D9] bg-opacity-30 border-[#3E3232] border-2 border-dashed rounded-xl ml-2 -mb-2 hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-300 ease-in-out">
      <h2 className="font-josefin_slab text-3xl text-[#3E3232] text-center mt-2 underline">Liked</h2>
      </div>

      <div className="row-span-3 ... bg-[#CCD3CA] bg-opacity-30 border-[#3E3232] border-2 h-[90vh] border-dashed rounded-xl mt-2 mb-2 mr-2 hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-300 ease-in-out">
      <h2 className="font-josefin_slab text-3xl text-[#3E3232] text-center mt-2 underline">Uploads</h2>
      </div>
</div>
</div>
  )
}

export default Profile
