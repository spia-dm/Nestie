"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server';
import {useState} from 'react'
import { useRouter } from 'next/navigation'
 

const Landing = () => {
    const session = useSession();
    console.log(session)
    const [executed,set_executed]=useState(0)
    const router = useRouter()

    if(session.status === "loading"){
      return (
        <div className="flex justify-center items-center h-screen">
          <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGM2dnBtOHhtOWZiaXhxY2htamJzdmRwbnU1NDlya2NvdXIwZTdydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/CbZwu25CGwNw9awRNt/giphy.gif" alt="loading" />
        </div>
      )
    }
    if(session.status==="authenticated"){
      const user_data={
        name:session.data.user.name,
        email:session.data.user.email,
        image:session.data.user.image,
        secret:""
      }
      
      
      try{
        
        //console.log(user_data)
        if(executed<1){
        const handleSignIn = async () => {
          const response = await axios.post('/api/db', user_data);
          console.log(response.data);
        };
        <h2></h2>
        handleSignIn()
        set_executed(1)
        router.push('/home')
      }
      }
      catch(e){
        console.log(e)
      }
    }
  
    return (
      <div className="bg-[#B5C0D0] h-screen flex flex-col">
        <div className="bg-[#3E3232] min-h-16 max-h-16">
          <div className="flex justify-center flex-grow">
            <h2 className="font-josefin_slab text-5xl text-[#B5C0D0] underline text-outline-black2 mt-14"></h2>
          </div>
          <div className="flex flex-row justify-end -mt-[3%] mr-2">
            <div>
              <button onClick={()=>signIn("google")} className="rounded-3xl text-3xl font-josefin_slab bg-[#625757] pl-3 p-2 pr-3 mr-2 text-[#CCD3CA] font-bold transition-all duration-500 ease-in-out active:bg-opacity-20">
                Log In
              </button>
            </div>
            <div>
              <button onClick={()=>signIn("google")} className="rounded-3xl text-3xl font-josefin_slab bg-[#B5C0D0] pl-3 p-2 pr-3 text-[#625757] font-bold active:bg-[#9CAFAA] hover:text-outline-black transition-all duration-500 ease-in-out">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center flex-1">
          <h1 className="text-[#625757] text-outline-black text-7xl bg-[#CCD3CA] font-josefin_slab p-2 mb-8">
            PropertEase
          </h1>
          <p className="text-[#625757] text-3xl font-josefin_slab mb-8 text-center font-extrabold">
            Unlock Your Dream Home, One Tap Away.
          </p>
          <button onClick={()=>signIn("google")} className="text-[#625757] bg-[#CCD3CA] p-2 active:bg-[#9CAFAA] hover:text-outline-black text-3xl font-josefin_slab font-extrabold transition-all duration-500 ease-in-out rounded-2xl border-[#625757] border-2">
            Get Started
          </button>
        </div>
      </div>
    );
};

export default Landing;
