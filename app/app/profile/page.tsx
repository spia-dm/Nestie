"use client"
import '../globals.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const Profile = () => {
  const session = useSession();
  const router = useRouter();
  const [profileBoxVisible, setProfileBoxVisible] = useState(false);
  const [twoStepStatus, setTwoStepStatus] = useState("https://i.ibb.co/9TCmzHv/off.png");
  const [showTfa, setShowTfa] = useState(false);
  const [latest_tfa, set_latest_tfa] = useState(false);
  const [first_qr, set_first_qr] = useState("");
  const [verify_tfa, set_verify_tfa] = useState("");
  const [secret, set_secret] = useState("");
  const [user_uploads,set_user_uploads]=useState([])
  const [notif_visible,set_notif_visible]=useState(false)
  const [notifications,set_notifications]=useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (session.status === "authenticated") {
        try {
          const response = await axios.post("/api/tfa", { email: session.data.user.email });
          set_latest_tfa(response.data.secret);
          setTwoStepStatus(response.data.secret ? "https://i.ibb.co/BfRtfc5/on.png" : "https://i.ibb.co/9TCmzHv/off.png");
        } catch (error) {
          console.error("Error fetching data:", error);
        }

        try{
          const response = await axios.post("/api/my-uploads",{email:session.data.user.email})
          set_user_uploads(response.data)
        }
        catch(e){

        }
      }
    };

    fetchData();
  }, [session]);

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGM2dnBtOHhtOWZiaXhxY2htamJzdmRwbnU1NDlya2NvdXIwZTdydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/CbZwu25CGwNw9awRNt/giphy.gif" alt="loading" />
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    router.push('/');
  }

  if(session.status==="authenticated"){
  const showProfileBox = () => {
    setProfileBoxVisible(prevProfileBoxVisible => !prevProfileBoxVisible);
    set_notif_visible(false)
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const changeTwoStep = async () => {
    setShowTfa(!latest_tfa);
    setTwoStepStatus(prevTwoStepStatus => prevTwoStepStatus === "https://i.ibb.co/9TCmzHv/off.png" ? "https://i.ibb.co/BfRtfc5/on.png" : "https://i.ibb.co/9TCmzHv/off.png");

    if (!latest_tfa) {
      var secret = speakeasy.generateSecret();
      set_secret(secret.base32);

      var label = 'PropertEase';
      var otpauth_url = speakeasy.otpauthURL({
        secret: secret.ascii,
        label: label,
        issuer: 'PropertEase'
      });

      qrcode.toDataURL(otpauth_url, (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        set_first_qr(url);
      });
    }
    else if(latest_tfa && twoStepStatus==="https://i.ibb.co/BfRtfc5/on.png"){
      const response = await axios.post("/api/rmtfa",{email:session.data.user.email})
      console.log(response.data.message)
    }
  };

  const verify_tfa_f = async() => {
    const response = await axios.post("/api/verifytfa",{secret:secret,user_token:verify_tfa})
    console.log(response.data.message)
    if(response.data.message===true){
      const response = await axios.post("/api/fixtfa",{email:session.data.user.email,secret:secret,user_token:verify_tfa})
      console.log(response.data.status)
      if(response.data.status===200){
      window.location.reload()
      }
    }
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
  const show_notifications=()=>{
    get_notifications()
    set_notif_visible(!notif_visible)
    setProfileBoxVisible(false)

  }
  return (
    <div className="bg-[#B5C0D0] h-screen flex flex-col">
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
        <div className="fixed right-0 top-16">
          <div className="border-[#3E3232] rounded-xl bg-[#CCD3CA] border-2 h-28 w-[10vw] text-[#3E3232] text-center font-josefin_slab text-2xl mr-1 z-10 flex flex-col">
          <button className="mt-4" onClick={()=>{router.push("/home")}}>Home</button>
          <button className="mt-4" onClick={handleSignOut}>Sign Out</button>
          </div>
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
      {twoStepStatus === "https://i.ibb.co/BfRtfc5/on.png" && showTfa && (
        <div className="bg-[#F5E8DD] border-2 border-[#3E3232] border-dashed fixed w-7/12 h-3/5 z-10 font-josefin_slab left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
          <h1 className="text-[#3E3232] text-4xl underline text-center mt-4">Two-Step Authentication</h1>
          <div className="flex justify-end -mt-2">
            <button onClick={() => { setShowTfa(false); window.location.reload() }} className="bg-[#EED3D9] -mt-12 w-20 text-xl font-josefin_slab text-[#3E3232]">Close</button>
          </div>
          <div className="flex flex-col items-center mt-20">
            <img src={first_qr} className="border-black border-2 h-44 w-44"></img>
            <input type="text" className="outline-none border-[#3E3232] border-b-2 mt-12 placeholder-[#3E3232] bg-transparent text-[#3E3232] text-center w-44 text-2xl" required value={verify_tfa} placeholder="enter code" onChange={(e) => { set_verify_tfa(e.target.value) }} />
            <button className="bg-[#3E3232] text-[#F5E8DD] w-44 rounded-2xl text-2xl mt-4" onClick={verify_tfa_f}>Verify</button>
          </div>
        </div>
      )}
      <div className="grid grid-rows-2 grid-flow-col gap-4">
        <div className="row-span-1 col-span-2 ... bg-[#F5E8DD] bg-opacity-30 border-[#3E3232] border-2 rounded-xl mt-2 ml-2 hover:shadow-2xl transition-all duration-500 ease-in-out">
          <h2 className="font-josefin_slab text-3xl text-[#3E3232] text-center mt-2 underline">My Data</h2>
          <div className="flex flex-row items-center justify-center text-center">
            <img className="rounded-xl w-48 mt-12 border-[#3E3232] border-4" src={session.data.user.image} alt="avatar" />
            <div className="flex flex-col mt-12 ml-8 h-48 mr-12">
              <h2 className="text-3xl text-[#3E3232] font-josefin_slab mt-4">{session.data.user.name}</h2>
              <h2 className="text-3xl text-[#3E3232] font-josefin_slab mt-4">{session.data.user.email}</h2>
              <div className="flex justify-center">
                <button onClick={changeTwoStep} className="mt-4"><img className="w-16" src={twoStepStatus} alt="2fa-off" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-1 col-span-2 ... bg-[#EED3D9] bg-opacity-30 border-[#3E3232] border-2 rounded-xl ml-2 -mb-2 hover:shadow-2xl transition-all duration-500 ease-in-out">
          <h2 className="font-josefin_slab text-3xl text-[#3E3232] text-center mt-2 underline">Liked</h2>
        </div>
        <div className="row-span-3 ... bg-[#CCD3CA] bg-opacity-30 border-[#3E3232] border-2 h-[90vh] rounded-xl mt-2 mb-2 mr-2 hover:shadow-2xl transition-all duration-500 ease-in-out max-h-2/4 overflow-y-auto">
          <h2 className="font-josefin_slab text-3xl text-[#3E3232] text-center mt-2 underline">Uploads</h2>
          {user_uploads.map((number, index) => (
    <div className="flex flex-col items-center mt-8">
    <div key={index} className="border-[#3E3232] bg-[#CCD3CA] bg-opacity-20 border-2 h-48 max-w-[35vw] rounded-xl hover:shadow-2xl transition-all duration-500 ease-in-out flex flex-row">
      <div>
        <img src={number.house_url} className="h-full rounded-bl-lg rounded-tl-lg border-[#3E3232] border-r-2" alt="house image"/>
      </div>
      <div className="flex flex-col justify-center w-6/12 bg-[#3E3232] text-white text-center rounded-tr-lg rounded-br-lg">
        <h2 className="font-josefin_slab text-md text-[#B5C0D0]">{number.house_name}</h2>
        <h2 className="font-josefin_slab text-md mt-2 text-[#B5C0D0]">{number.price}</h2>
        <h2 className="font-josefin_slab text-md mt-2 text-[#B5C0D0]">{number.location}</h2>
        <h2 className="font-josefin_slab text-md mt-2 text-[#B5C0D0]">{number.size}</h2>
        <h2 className="font-josefin_slab text-md mt-2 text-[#B5C0D0]">{number.likes} &#9829;</h2>
      </div>
    </div>
    </div>
  ))}
        </div>
      </div>
    </div>
  );
};
}
export default Profile;
