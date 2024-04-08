"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import '../globals.css'
import Image from 'next/image'

const Home = () => {
  const session = useSession()
  const router = useRouter()
  const [profile_box_visible, set_profile_box_visible] = useState(false)
  const [get_house,set_get_house]=useState(false)
  const [house_data,set_house_data]=useState([])
  const promptList = [
    "Beautiful Villa ...",
    "Luxurious Apartment ...",
    "Cozy Bungalow ...",
    "Spacious Penthouse ...",
    "Modern Villa ...",
    "Elegant Row House ...",
    "Luxury Apartment ...",
    "Gorgeous Farmhouse ...",
    "Stylish Duplex ...",
    "Traditional Haveli ...",
    "Charming Cottage ...",
    "Rustic Log Cabin ...",
    "Seaside Villa ...",
    "Mountain Chalet ...",
    "Urban Loft ...",
    "Garden Villa ...",
    "Contemporary Townhouse ...",
    "Three-story Home ...",
    "Ranch Style House ...",
    "Tropical Villa ..."
  ];

  const [searchPrompt, setSearchPrompt] = useState("");
  const [search_value,set_search_value]=useState("")

  useEffect(() => {
    let index = 0;

    const changeSearchPrompt = () => {
      setSearchPrompt(promptList[index]);
      index = (index + 1) % promptList.length;
      setTimeout(changeSearchPrompt, 3000);
    };

    const timeoutId = setTimeout(changeSearchPrompt, 0);
    return () => clearTimeout(timeoutId); 
  }, []);
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
  const Get_House=async()=>{
    try{
      const response=await axios.get("/api/houses")
      set_house_data(response.data)
    }
    catch(e){
      console.log(e)
    }
  }
  if(!get_house){
  Get_House()
  set_get_house(true)
  }
  const show_profile_box=()=>{
    set_profile_box_visible(!profile_box_visible)
  }
  const handleSignOut = async () => {
    await signOut();
  };
  const send_search=async()=>{
    try{
    const response=await axios.post("/api/search",{search:search_value})
    }
    catch(e){

    }
  }
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
      <div className="flex justify-center">
        <input className="border-[#3E3232] border-b-4 bg-transparent -mt-4 text-4xl font-josefin_slab text-center w-7/12 mt-16 placeholder:text-gray-500 placeholder:text-4xl placeholder:text-center text-[#3E3232] outline-none" type="text" placeholder={searchPrompt} value={search_value} onChange={(e)=>{set_search_value(e.target.value)}}></input>
        <button onClick={send_search} className="text-3xl mt-20 p-2 border-2 rounded-br-xl rounded-tr-xl border-black w-1/12 bg-[#3E3232] flex justify-center"><svg className="h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="#B5C0D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg></button>
      </div>
      <div className="w-6/12 top-16 fixed left-[87vw]">
      {profile_box_visible && (
        <div className="border-[#3E3232] rounded-xl bg-[#CCD3CA] bg-opacity-30 border-2 h-48 w-3/12 text-[#3E3232] text-center font-josefin_slab text-2xl mr-1 z-10 flex flex-col">
        <button className="mt-8" onClick={() => router.push('/profile')}>Profile</button>
        <button className="mt-8" onClick={handleSignOut}>Sign Out</button>
      </div>
      )}
      </div>
  {house_data.map((number, index) => (
    <div className="flex flex-col items-center mt-16">
    <div key={index} className="border-[#3E3232] bg-[#CCD3CA] bg-opacity-20 border-2 w-8/12 h-[50vh] mt-8 mb-8 rounded-xl hover:shadow-2xl hover:drop-shadow-2xl transition-all duration-300 ease-in-out flex flex-row">
      <div>
        <img src={number.house_url} className="h-full rounded-bl-lg rounded-tl-lg border-[#3E3232] border-r-2" alt="house image"/>
      </div>
      <div className="flex flex-col justify-center w-4/12 bg-[#3E3232] text-white text-center rounded-tr-lg rounded-br-lg">
        <h2 className="font-josefin_slab text-2xl text-[#B5C0D0]">{number.house_name}</h2>
        <h2 className="font-josefin_slab text-2xl mt-8 text-[#B5C0D0]">{number.price}</h2>
        <h2 className="font-josefin_slab text-2xl mt-8 text-[#B5C0D0]">{number.location}</h2>
        <h2 className="font-josefin_slab text-2xl mt-8 text-[#B5C0D0]">{number.size}</h2>
        <h2 className="font-josefin_slab text-2xl mt-8 text-[#B5C0D0]">{number.likes} &#9829;</h2>
        <h2 className="font-josefin_slab text-lg mt-8 text-[#B5C0D0]">Uploaded by - {number.uploaded_by}</h2>
      </div>
    </div>
    </div>
  ))}
    </div>
  );
};

export default Home;
