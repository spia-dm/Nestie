"use client"
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Show() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [profileBoxVisible, setProfileBoxVisible] = useState(false);
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search) {
          const response = await axios.post(`/api/show`, { search });
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [search]);

  if (session.status === "authenticated") {
    const showProfileBox = () => {
      setProfileBoxVisible(prevProfileBoxVisible => !prevProfileBoxVisible);
    };

    const handleSignOut = async () => {
      await signOut();
    };

    return (
      <div className="bg-[#B5C0D0] min-h-screen flex flex-col">
        <div className="bg-[#3E3232] min-h-16 max-h-16">
          <div className="flex justify-center flex-grow">
            <h2 className="font-josefin_slab text-5xl text-[#B5C0D0] underline text-outline-black2 mt-2 ">PropertEase</h2>
          </div>
          <div className="flex justify-end">
            <button onClick={showProfileBox} className="scale-50 -mt-20 pt-1">
              <img className="rounded-full border-[#B5C0D0] border-4" src={session.data.user.image} alt="avatar" />
            </button>
          </div>
        </div>
        {profileBoxVisible && (
          <div className="border-[#3E3232] rounded-xl bg-[#CCD3CA] border-2 h-16 w-[10vw] text-[#3E3232] text-center font-josefin_slab text-2xl mt-4 mx-auto">
            <button className="mt-4" onClick={handleSignOut}>Sign Out</button>
          </div>
        )}

          <div className="grid grid-cols-3 grid-rows-5 gap-4 h-[90vh]">

          <div className="border-[#3E3232] border-2 rounded-xl row-span-3 col-span-2 ml-4 mt-4 bg-[#F5E8DD] bg-opacity-40 hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-500 ease-in-out">1</div>
          <div className="border-[#3E3232] border-2 rounded-xl row-span-5 col-span-1 mt-4 mr-4 h-[88vh] bg-[#CCD3CA] bg-opacity-40 hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-500 ease-in-out">2</div>
          <div className="border-[#3E3232] border-2 rounded-xl row-span-2 col-span-2 ml-4 bg-[#EED3D9] bg-opacity-40 hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-500 ease-in-out">
          <div className="flex flex-rol justify-center">
          <button className="border-[#3E3232] border-2 rounded-lg bg-[#3E3232] text-[#EED3D9] text-2xl w-6/12 ml-2 mt-2 mr-2 font-josefin_slab">Like</button>
          <button className="border-[#3E3232] border-2 rounded-lg bg-[#3E3232] text-[#EED3D9] text-2xl w-6/12 mr-2 mt-2 ml-2 font-josefin_slab">Request More Photos</button>
          </div>
          <textarea className="outline-none bg-transparent border-[#3E3232] border-t-2 pl-2 font-josefin_slab text-[#3E3232] rounded-br-lg rounded-bl-lg w-full mt-52 text-lg h-12"></textarea>
          <button></button>

          </div>

          </div>

          </div>
    );
  }
}
