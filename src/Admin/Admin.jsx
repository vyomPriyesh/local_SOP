import React, { useEffect, useState } from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Sidebar from './Components/Sidebar';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import logo from '../assets/admin_logo.png'
import line from '../assets/Line.png'
import { IoBagRemove } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { BiUser } from "react-icons/bi";
import { BiLink } from "react-icons/bi";
import { LuFileText } from "react-icons/lu";
import { PiBookOpenText } from "react-icons/pi";
import { Route, Routes, useLocation } from 'react-router';
import Dashboard from './Pages/Dashboard';
import Listings from './Pages/Listings';
import Leads from './Pages/Leads';
import Users from './Pages/Users';



const Admin = () => {

    const [isExpanded, setIsExpanded] = useState(true);
    const to = 'admin'
    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setIsExpanded(false);
            } else {
                setIsExpanded(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const links = [
        { name: "Dashboards", to: "dashboard", icon: LuLayoutDashboard },
        { name: "Listings", to: "listings", icon: IoBagRemove },
        { name: "Lead", to: "leads", icon: GoChecklist },
        { name: "User", to: "users", icon: BiUser },
        { name: "Useful Links", to: "userful-links", icon: BiLink },
        { name: "CMS", to: "cms", icon: LuFileText },
        { name: "News for you", to: "news", icon: PiBookOpenText },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <div className={`${isExpanded ? "xl:w-1/5 2xl:w-1/6 md:w-1/3" : "2xl:w-36 xl:w-32 lg:w-36 md:w-32 "} bg-[#020C16] md:block hidden relative flex-shrink-0 transition-all duration-300 ease-in-out`}>

                <button onClick={toggleMenu} className={`${isExpanded ? 'rotate-180' : ''} transition-all duration-300 ease-in-out translate-x-1/2 absolute h-6 w-6 right-0 top-5 z-50 bg-white rounded-full text-[#020C16] aspect-square flex justify-center place-items-center`}><MdOutlineArrowForwardIos /></button>
                <div
                    className={` text-white  w-full h-full 
                        } overflow-y-auto`}
                >
                    <div className="p-3 flex flex-col justify-center place-items-center sticky top-0 z-40 bg-[#020C16]">
                        <img src={logo} alt="" className='w-full h-full object-contain' />
                        <img src={line} alt="" className='mt-5 w-40' />
                    </div>
                    <Sidebar
                        isExpanded={isExpanded}
                        toggleMenu={toggleMenu}
                        links={links}
                        to={to}
                    />
                </div>
                <div className={` ${isExpanded ? 'px-7' : 'px-7'} w-full sticky bottom-0`}>
                    <button
                        // onClick={logout}
                        className={`flex flex-row items-center text-white mb-3 w-full  cursor-pointer overflow-hidden text-nowrap rounded-lg hover:scale-105 hover:shadow-2xl  transition-all duration-100 ease-out  md:py-3 py-2 md:px-1`}
                    >
                        {isExpanded && <span className='text-sm capitalize font--medium transition-all duration-100 ease-out'>Log Out</span>}
                        <div className={`flex  justify-center transition-all duration-100 ease-out ${isExpanded ? 'px-5' : 'w-full'}`}>
                            <RiLogoutCircleRLine  />
                        </div>
                    </button>
                </div>
            </div>
            {isExpanded && (
                <>
                    <div
                        className={`fixed inset-0 bg-black  bg-opacity-50 z-10 md:hidden transition-all duration-300 ease-out ${isExpanded ? "translate-x-0" : "-translate-x-5"
                            }`}
                        onClick={toggleMenu}
                    ></div>
                    <div className={`bg-[#020C16] w-64 md:hidden`}>
                        <div className="p-3 flex flex-col justify-center place-items-center sticky top-0 z-40 bg-[#020C16] ">
                            <img src={logo} alt="" className='w-full h-full object-contain' />
                            <img src={line} alt="" className='mt-5 w-40' />
                        </div>
                        <div
                            className={`  md:hidden text-white block z-50 fixed flex-shrink-0 scroll transition-all duration-300 ease-in-out h-full
                            } overflow-y-auto`}
                        >
                            <Sidebar
                                isExpanded={isExpanded}
                                toggleMenu={toggleMenu}
                                links={links}
                                to={to}
                            />
                        </div>
                    </div>
                </>
            )}
            <div className="flex-grow  overflow-y-auto overflow-hidden ">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/listings" element={<Listings />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin