"use client"
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios'
import {useRouter}from 'next/navigation'

export default function Upload() {
    const router= useRouter()
    const session = useSession();
    const [profileBoxVisible, setProfileBoxVisible] = useState(false);
    const [houseUrl, setHouseUrl] = useState("");
    const [houseName, setHouseName] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [size, setSize] = useState("");
    const [description, setDescription] = useState("");

    const showProfileBox = () => {
        setProfileBoxVisible(prevProfileBoxVisible => !prevProfileBoxVisible);
    };

    const handleSignOut = async () => {
        await signOut();
    };
    if(session.status==="unauthenticated"){
        router.push('/')
    }
    if (session.status === "authenticated") {
        const upload = async(e) => {
            e.preventDefault();
            const response = await axios.get("/api/size")
            console.log(response.data)
            const upload_data = {
                id:""+(response.data+1).toString(),
                house_url: houseUrl,
                house_name: houseName,
                price: price,
                location: location,
                size: size,
                likes:"0",
                comments:[],
                uploaded_by: session.data.user.name,
                description: description,
                email:session.data.user.email
                
            };
            console.log(upload_data);
            try{
                const response = await axios.post("/api/upload",upload_data)
                console.log(response.data)
            }
            catch(e){
                console.log(e)
            }
        };

        return (
            <div className="bg-[#B5C0D0] h-screen flex flex-col">
                <div className="bg-[#3E3232] min-h-16 max-h-16 fixed w-full">
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
                    <div className="fixed right-0 top-16">
                        <div className="border-[#3E3232] rounded-xl bg-[#CCD3CA] border-2 h-16 w-[10vw] text-[#3E3232] text-center font-josefin_slab text-2xl mr-1 z-10 flex flex-col">
                            <button className="mt-4" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>
                )}

                <div className="flex justify-center font-josefin_slab text-[#3E3232] text-3xl underline mt-8">
                    <h2>Upload Home</h2>
                </div>
                <form onSubmit={upload}>
                    <div className="flex flex-col items-center">

                        <input className="mt-20 border-[#3E3232] border-b-2 bg-transparent w-4/12 text-2xl outline-none text-[#3E3232] font-josefin_slab text-center placeholder-gray-500"
                            type="text"
                            placeholder="url"
                            value={houseUrl}
                            onChange={(e) => setHouseUrl(e.target.value)}
                            required
                        />
                        <input className="mt-12 border-[#3E3232] border-b-2 bg-transparent w-4/12 text-2xl outline-none text-[#3E3232] font-josefin_slab text-center placeholder-gray-500"
                            type="text"
                            placeholder="house name"
                            value={houseName}
                            onChange={(e) => setHouseName(e.target.value)}
                            required
                        />
                        <input className="mt-12 border-[#3E3232] border-b-2 bg-transparent w-4/12 text-2xl outline-none text-[#3E3232] font-josefin_slab text-center placeholder-gray-500"
                            type="text"
                            placeholder="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <input className="mt-12 border-[#3E3232] border-b-2 bg-transparent w-4/12 text-2xl outline-none text-[#3E3232] font-josefin_slab text-center placeholder-gray-500"
                            type="text"
                            placeholder="location - city,state"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                        <input className="mt-12 border-[#3E3232] border-b-2 bg-transparent w-4/12 text-2xl outline-none text-[#3E3232] font-josefin_slab text-center placeholder-gray-500"
                            type="text"
                            placeholder="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            required
                        />
                        <textarea className="mt-12 border-[#3E3232] border-b-2 bg-transparent w-4/12 text-2xl outline-none text-[#3E3232] font-josefin_slab text-center placeholder-gray-500"
                            placeholder="description . . ."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <button className="bg-[#3E3232] text-[#B5C0D0] font-josefin_slab rounded-xl mt-16 text-3xl p-3" type="submit">Upload</button>

                    </div>
                </form>
            </div>
        )
    }
}
