import React from 'react'
import { IoSearchSharp } from "react-icons/io5";

const Navbar = ({ text }) => {
    return (
        <>
            <div className="bg-[#F6F7F8] flex justify-between place-items-center border-b border-[#00000026]  md:px-10 px-3 md:h-20 h-16 sticky top-0">
                <h1 className='2xl:text-2xl xl:text-xl text-lg font-semibold'>{text}</h1>
                <div className="flex flex-row gap-5 place-items-center">
                    {/* <div className="flex flex-row place-items-center gap-2 border-2 h-full border-[#020C1626] bg-white rounded-xl p-1 w-72">
                        <h1 className='text-xl'>
                            <IoSearchSharp />
                        </h1>
                        <input type="search" name="" id="" className='border-0 w-full bg-transparent outline-none py-1' placeholder='Search here...' />
                    </div> */}
                    <div className="flex flex-row gap-5 place-items-center">
                        <img className='md:h-11 md:w-11 w-9 h-9 object-cover md:rounded-xl rounded-lg' src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        <div className="flex flex-col justify-between">
                            <h1 className='xl:text-lg  md:text-base text-sm font-semibold'>Johan Roy</h1>
                            <span className='md:text-sm text-xs text-[#6C6C6C]'>Admin</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar