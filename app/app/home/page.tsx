"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import '../globals.css'

export default function Home() {
  const session = useSession()
  console.log(session.status)
  const router = useRouter()
  const [profile_box_visible, set_profile_box_visible] = useState(false)
  const [get_house,set_get_house]=useState(false)
  const [house_data,set_house_data]=useState([])
  const [notif_visible,set_notif_visible]=useState(false)
  const [notifications,set_notifications]=useState([])
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);  
  const [search_value,set_search_value]=useState("")

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
if(session.status==="authenticated"){
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };


  const Get_House=async()=>{
    try{
      const response=await axios.get("/api/houses")
      response.data.sort((a, b) => {
        const idA = parseInt(a.id);
        const idB = parseInt(b.id);
        return idB - idA;
    });
      set_house_data(response.data)
      console.log(house_data)
    }
    catch(e){
      console.log(e)
    }
  }
  if(!get_house){
  Get_House()
  getLocation();
  set_get_house(true)
  }
  const show_profile_box=()=>{
    set_profile_box_visible(!profile_box_visible)
    set_notif_visible(false)
  }
  const handleSignOut = async () => {
    await signOut();
    router.push('/')
  };
  const send_search=async()=>{
    if (!search_value.trim()) {
      alert('Comment cannot be empty');
      return;
    }
    try{
    const response=await axios.post("http://localhost:8000/api/search",{data:house_data,search:search_value})
    set_house_data(response.data)
    }
    catch(e){

    }
  }

  const show_notifications=()=>{
    get_notifications()
    set_notif_visible(!notif_visible)
    set_profile_box_visible(false)

  }

  const get_notifications=async()=>{
    try{
      const response = await axios.post("/api/get-notif",{email: session.data.user.email})
      //console.log(response.data)
      set_notifications(response.data.notifications)
    }
    catch(e){

    }
  }

  const location_search=()=>{
    console.log(latitude+" "+longitude)
  }
  return (
    <div className="bg-[#B5C0D0] h-screen flex flex-col">
      <div className="bg-[#3E3232] min-h-16 max-h-16 fixed w-full">
      <div className="flex justify-center flex-grow">
          <h2 className="font-josefin_slab text-5xl text-[#B5C0D0] underline text-outline-black2 mt-2">PropertEase</h2>
          </div>
          <div className="flex justify-end mt-3">
          <button className="-mt-20 w-8 mr-4" onClick={()=>{router.push("/upload-home")}}>
          <img src="https://i.ibb.co/42D8xXF/home-add-svgrepo-com.png" alt="upload home"></img>
          </button>
          <button className="-mt-20 w-8" onClick={show_notifications}><img src="https://i.ibb.co/G9nF3SV/bell2.png" alt="notifications"></img></button>
          <button onClick={show_profile_box} className="w-12 h-12 -mt-16 mr-4 ml-4 rounded-full">
          <img className="w-12 rounded-full border-[#B5C0D0] border-2" src={session.data.user.image} alt="avatar"/>
          </button>
          </div>
          </div>

      <div className="flex justify-center mt-16">
        <button onClick={location_search} className="text-3xl mt-20 p-2 border-2 rounded-bl-xl rounded-tl-xl border-black w-1/12 bg-[#3E3232] flex justify-center"><img className="h-9" src="https://i.ibb.co/72GJHPZ/gps.png" alt="filter"></img></button>
        <input className="border-[#3E3232] border-b-4 bg-transparent text-3xl font-josefin_slab text-center w-6/12 mt-20 placeholder:text-gray-500 placeholder:text-4xl placeholder:text-center placeholder:text-3xl text-[#3E3232] outline-none" type="text" placeholder="Search ..." value={search_value} onChange={(e)=>{set_search_value(e.target.value)}}></input>
        <button onClick={send_search} className="text-3xl mt-20 p-2 border-2 rounded-br-xl rounded-tr-xl border-black w-1/12 bg-[#3E3232] flex justify-center"><svg className="h-9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="#B5C0D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg></button>
      </div>
      <div className="w-6/12 top-16 fixed left-[87vw]">
      {profile_box_visible && (
        <div className="fixed right-0 top-16">
          <div className="border-[#3E3232] rounded-xl bg-[#CCD3CA] border-2 h-28 w-[10vw] text-[#3E3232] text-center font-josefin_slab text-2xl mr-1 z-10 flex flex-col">
          <button className="mt-4" onClick={()=>{router.push("/profile")}}>Profile</button>
          <button className="mt-4" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      )}
      </div>
      {notif_visible && (
  <div className="bg-[#CCD3CA] rounded-xl border-[#3E3232] border-2 h-2/5 max-w-[20vw] min-w-[20vw] overflow-y-auto text-[#3E3232] text-center font-josefin_slab text-2xl mt-16 right-0 z-10 mx-auto fixed flex flex-col">
    {notifications.map((not, index) => (
      <div key={index} className={`text-[#3E3232] border-[#3E3232] border-t font-josefin_slab flex items-center justify-center flex-row ${index === 0 ? 'rounded-t-l-lg' : ''}`}>
        <p className="text-base pt-2">{not}</p>
      </div>
    ))}
  </div>      
)}


{house_data.map((number, index) => (
  <div className={`flex flex-col items-center ${index === 0 ? 'mt-20' : 'mt-8'}`} key={index}>
    <button onClick={() => { router.push(`/show?search=${number.id}`) }}>
      <div className="border-[#3E3232] bg-[#CCD3CA] w-[66.5vw] bg-opacity-20 border-2 h-[50vh] mt-8 mb-8 rounded-xl hover:shadow-2xl transition-all duration-500 ease-in-out flex flex-row">
        <div>
          <img src={number.house_url} className="h-full rounded-bl-lg rounded-tl-lg border-[#3E3232] border-r-2" alt="house image"/>
        </div>
        <div className="flex flex-col justify-center w-4/12 bg-[#3E3232] text-white text-center rounded-tr-lg rounded-br-lg">
          <h2 className="font-josefin_slab text-2xl text-[#B5C0D0]" key={number.house_name}>{number.house_name}</h2>
          <h2 className="font-josefin_slab text-2xl mt-8 text-[#B5C0D0]">{number.price}</h2>
          <h2 className="font-josefin_slab text-2xl mt-8 text-[#B5C0D0]">{number.location}</h2>
          <h2 className="font-josefin_slab text-2xl mt-8 text-[#B5C0D0]">{number.size}</h2>
          <h2 className="font-josefin_slab text-2xl mt-8 text-[#B5C0D0]">{number.likes.length} &#9829;</h2>
          <h2 className="font-josefin_slab text-lg mt-8 text-[#B5C0D0]">Uploaded by - {number.uploaded_by}</h2>
        </div>
      </div>
    </button>
  </div>
))}


  
    </div>
  );
};}
