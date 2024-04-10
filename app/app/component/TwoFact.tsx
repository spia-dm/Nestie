export default function TwoFact({ show_tfa, set_show_tfa }) {
    
    return (
      <div className="bg-[#F5E8DD] border-2 border-[#3E3232] border-dashed fixed w-7/12 h-3/5 z-10 font-josefin_slab left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
        <h1 className="text-[#3E3232] text-4xl underline text-center mt-4">Two-Step Authentication</h1>
        <div className="flex justify-end -mt-2">
        <button onClick={()=>{set_show_tfa(false)}} className="bg-[#EED3D9] -mt-12 w-20 text-xl font-josefin_slab text-[#3E3232]">Close</button>
        </div>
        <h1 className="text-[#3E3232] text-4xl underline text-center mt-4">{show_tfa} - {set_show_tfa}</h1>
      </div>
    )
  }