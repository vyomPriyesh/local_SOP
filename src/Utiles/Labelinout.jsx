import React from 'react'

const Labelinout = ({ label, placeholder, madetory ,value,onChange}) => {
    return (
        <div className='flex flex-col gap-2'>
            <label className="text-[var(--lable)] block mb-1">
                {label} {madetory &&<span className="text-red-500">*</span>}
            </label>
            <input value={value} onChange={onChange} type="text" className="w-full h-14 p-4 text-lg text-[#222] bg-[#e9eaf0] rounded-[15px] outline-none 
               shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,1),2px_2px_9px_rgba(19,40,109,0.1)] 
               focus:border-[#6c63ff] placeholder:text-[#999] focus:placeholder:text-[#555] 

               max-[1440px]:h-10 max-[1440px]:p-2 max-[1440px]:text-sm max-[1440px]:rounded-[10px] 
               max-[1440px]:placeholder:text-xs
               [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
               appearance-none"
                placeholder={placeholder}
            />
        </div>
    )
}

export default Labelinout
