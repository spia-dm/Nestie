"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'
const SignIn=()=>{


  const session =useSession();
    console.log(session);
    if(session.status ==="loading"){
        return <p>Loading....</p>
    }
    if(session.status ==="authenticated"){
        return  <button onClick={()=>signOut("google")}>Logout</button>
    }



    return(
    <div className="bg-[#B5C0D0] h-screen flex flex-col">
      <nav className="bg-[#3E3232] h-16 flex justify-end items-center px-4">
        <Link href="/signin" className="rounded-3xl text-3xl font-josefin_slab bg-[#625757] pl-3 p-2 pr-3 mr-2 text-[#CCD3CA] font-bold transition-all duration-300 ease-in-out active:bg-opacity-20">
          Log In
        </Link>
        <Link href="/signup" className="rounded-3xl text-3xl font-josefin_slab bg-[#B5C0D0] pl-3 p-2 pr-3 text-[#625757] font-bold active:bg-[#9CAFAA] hover:text-outline-black transition-all duration-300 ease-in-out">
          Get Started
        </Link>
      </nav>
      <div className="flex flex-col justify-start w-4/12 items-center mt-52 ml-52">
        <h1 className="text-[#625757] text-outline-black text-7xl bg-[#CCD3CA] font-josefin_slab p-2 mb-8">
          PropertEase
        </h1>
        <p className="text-[#625757] text-3xl font-josefin_slab mb-8 text-center font-extrabold">
          Unlock Your Dream Home,<br></br> One &nbsp; Tap &nbsp; Away.
        </p>
        <Link href="/signup" className="text-[#625757] bg-[#CCD3CA] p-2 active:bg-[#9CAFAA] hover:text-outline-black text-3xl font-josefin_slab font-extrabold transition-all duration-300 ease-in-out rounded-2xl border-[#625757] border-2">
          Get Started
        </Link>
      </div>
      <div>
        <button onClick={()=>signIn("google")}>Sign in with google</button>
      </div>
    </div>
    )
}
export default SignIn