"use client"
import '../globals.css';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Suspense } from 'react';
import {useRouter} from 'next/navigation'

function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  return <>{search}</>;
}

export default function Show() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShowContent />
    </Suspense>
  );
}

function ShowContent() {
  const searchParams = useSearchParams();
  const search_value = searchParams.get('search');
  const [profileBoxVisible, setProfileBoxVisible] = useState(false);
  const [house_url, set_house_url] = useState('');
  const [description, set_description] = useState('');
  const [id, set_id] = useState('');
  const session = useSession();
  const [run, set_run] = useState(false);
  const [likes, set_likes_count] = useState('');
  const [comment, set_comment] = useState('');
  const [all_comments, set_all_comments] = useState([]);
  const [image,set_image]=useState("")
  const router = useRouter()
  const [notif_visible,set_notif_visible]=useState(false)
  const [notifications,set_notifications]=useState([])
  useEffect(() => {
    if (session.status === 'authenticated') {
      const fetchData = async () => {
        try {
          if (search_value) {
            const response = await axios.post(`/api/show`, { id: search_value });
            set_house_url(response.data.house_url);
            set_description(response.data.description);
            set_id(response.data.id);
            set_image(session.data.user.image)
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      if (!run) {
        fetchData();
        get_likes();
        get_comments();
        get_notifications()
        set_run(true);
      }
    }
  }, [session, search_value, run]);

  const get_likes = async () => {
    const response = await axios.post('/api/like-count', { id: search_value });
    set_likes_count(response.data.likes);
  };

  const get_comments = async () => {
    const response = await axios.post('/api/get-comment', { id: search_value });
    set_all_comments(response.data.comments);
    //console.log(response.data);
  };

  const showProfileBox = () => {
    setProfileBoxVisible((prevProfileBoxVisible) => !prevProfileBoxVisible);
    set_notif_visible(false)
  };

  const get_notifications=async()=>{
    try{
      const response = await axios.post("/api/get-notif",{email: session.data.user.email})
      //console.log(response.data)
      set_notifications(response.data.notifications)
    }
    catch(e){

    }
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const Liked = async () => {
    const response = await axios.post('/api/like', { id: id, email: session.data.user.email });
    //console.log(response.data);
    get_likes();
  };

  const send_comment = async () => {
    if (!comment.trim()) {
      alert('Comment cannot be empty');
      return;
    }
    const response = await axios.post('/api/comment', { id: id, name: session.data.user.name, comment: comment });
    set_comment('');
    get_comments();
  };

  const Requested=async()=>{
    const response = await axios.post("/api/request",{id:id,name:session.data.user.name})
  }

  const show_notifications=()=>{
    get_notifications()
    set_notif_visible(!notif_visible)
    setProfileBoxVisible(false)

  }

  return (
    <div className="bg-[#B5C0D0] min-h-screen flex flex-col">
      <div className="bg-[#3E3232] min-h-16 max-h-16">
      <div className="flex justify-center flex-grow">
          <h2 className="font-josefin_slab text-5xl text-[#B5C0D0] underline text-outline-black2 mt-2">PropertEase</h2>
          </div>
          <div className="flex justify-end mt-3">
          <button className="-mt-20 w-8 mr-4" onClick={()=>{router.push("/upload-home")}}>
          <img src="https://i.ibb.co/42D8xXF/home-add-svgrepo-com.png" alt="upload home"></img>
          </button>
          <button className="-mt-20 w-8" onClick={show_notifications}><img src="https://i.ibb.co/G9nF3SV/bell2.png" alt="notifications"></img></button>
          <button onClick={showProfileBox} className="w-12 h-12 -mt-16 mr-4 ml-4 rounded-full">
          <img className="w-12 rounded-full border-[#B5C0D0] border-2" src={session.data.user.image} alt="avatar"/>
          </button>
          </div>
          </div>
          {profileBoxVisible && (
        <div className="border-[#3E3232] rounded-xl bg-[#CCD3CA] border-2 h-40 w-[10vw] text-[#3E3232] text-center font-josefin_slab text-2xl mt-16 right-0 z-10 mx-auto fixed flex flex-col">
          <button className="mt-4" onClick={()=>{router.push("/home")}}>Home</button>
          <button className="mt-4" onClick={()=>{router.push("/profile")}}>Profile</button>
          <button className="mt-4" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}

{notif_visible && (
  <div className="bg-[#CCD3CA] rounded-xl border-[#3E3232] border-2 h-2/5 max-w-[20vw] min-w-[20vw] overflow-y-auto text-[#3E3232] text-center font-josefin_slab text-2xl mt-16 right-0 z-10 mx-auto fixed flex flex-col">
    {notifications.map((not, index) => (
      <div key={index} className={`text-[#3E3232] border-[#3E3232] border-t font-josefin_slab flex items-center justify-center flex-row ${index === 0 ? 'rounded-t-l-lg' : ''}`}>
        <p className="text-base pt-2">{not}</p>
      </div>
    ))}
  </div>      
)}


      <div className="grid grid-cols-3 grid-rows-5 gap-4 h-[90vh]">

        <div className="border-[#3E3232] border-2 rounded-xl row-span-3 col-span-2 ml-4 mt-4 bg-[#F5E8DD] bg-opacity-40 hover:shadow-2xl transition-all duration-500 ease-in-out flex justify-center">
          <img className="rounded-lg w-full" src={house_url} alt="avatar" />
        </div>
        <div className="border-[#3E3232] border-2 rounded-xl row-span-5 col-span-1 mt-4 mr-4 max-h-[88vh] bg-[#CCD3CA] bg-opacity-40 hover:shadow-2xl transition-all duration-500 ease-in-out text-xl overflow-auto text-[#3E3232] font-josefin_slab p-2">{description}</div>
        <div className="border-[#3E3232] border-2 rounded-xl row-span-2 col-span-2 ml-4 bg-[#EED3D9] bg-opacity-40 hover:shadow-2xl transition-all duration-500 ease-in-out">
          <div className="flex flex-rol justify-center">
            <button className="border-[#3E3232] border-2 rounded-lg bg-[#3E3232] text-[#EED3D9] text-2xl w-6/12 ml-2 mt-2 mr-2 font-josefin_slab pt-2 pb-2" onClick={Liked}>Like ({likes})</button>
            <button className="border-[#3E3232] border-2 rounded-lg bg-[#3E3232] text-[#EED3D9] text-2xl w-6/12 mr-2 mt-2 ml-2 font-josefin_slab pt-2 pb-2" onClick={Requested}>Request More Photos</button>
          </div>
          <div className="max-h-[23vh] min-h-[23vh] overflow-y-auto">
            {all_comments.map((comment, index) => (
              <div key={index} className="text-[#3E3232] font-josefin_slab flex items-center justify-center flex-row gap-4 mt-2 mb-2">
                <div className="flex flex-col">
                <p className="max-w-[85ch] overflow-wrap-break break-all bg-[#CCD3CA] pr-2 pl-2 rounded-lg border-[#3E3232] border">{comment[0]} <p className="text-[1.25vh] mt-0.5 opacity-50">{comment[2]}</p></p>
                </div>
                <p className="text-xs mt-0.5 opacity-50">- {comment[1]}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-row">
            <input className="text-center outline-none bg-transparent border-[#3E3232] border-t-2 pl-2 font-josefin_slab text-[#3E3232] rounded-br-lg rounded-bl-lg w-full text-lg min-h-[5vh] max-h-[5vh]" type="text" value={comment} onChange={(e) => { set_comment(e.target.value) }} required />
            <div>
              <button onClick={send_comment}><img src="https://i.ibb.co/JrYgG9H/send3.png" alt="send" className="h-[4.5vh] bg-[#3E3232] border-[#3E3232] border-t-2 border-b-2 rounded-br-lg p-2"></img></button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
