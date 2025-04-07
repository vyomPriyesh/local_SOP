import React from 'react'
import { LuLogOut } from 'react-icons/lu';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isExpanded, toggleMenu, links ,to}) => {

    return (
        <>
            <div className={`mt-5 pb-28 md:pb-10 ${isExpanded ? 'px-7' : 'px-7'} space-y-2 `}>
                {links.map((list, index) => (
                    <NavLink
                        to={`/${to}/${list.to}`}
                        key={index}
                        className={({ isActive }) => `${isActive || (list.to === 'dashboard' && window.location.pathname === '/admin') ? 'bg-white/30 text-white font-medium' : 'text-[#8F95A3]'} flex flex-row items-center mb-3 overflow-hidden text-nowrap rounded-lg hover:scale-105 hover:text-white hover:bg-white/30  transition-all duration-100 ease-out  md:py-2.5 py-2`}
                        onClick={() => {
                            if (window.innerWidth <= 999) toggleMenu();
                        }}
                    >
                        <div className={`flex justify-center transition-all duration-100 ease-out ${isExpanded ? 'px-2' : 'w-full'}`}>
                            <list.icon size={19} />
                        </div>
                        {isExpanded && <span className='text-base  capitalize  transition-all duration-100 ease-out'>{list.name}</span>}
                    </NavLink>

                ))}
            </div>
                
        </>
    )
}

export default Sidebar