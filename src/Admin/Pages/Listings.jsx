import React from 'react'
import Navbar from '../Components/Navbar'
import { IoSearchSharp } from 'react-icons/io5'
import { TfiViewListAlt } from "react-icons/tfi";
import { CgCalendarDates } from "react-icons/cg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Filter from '../Utilies/Filter';

const Listings = () => {

    const datas = [
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            status: 'active',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            status: 'active',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            status: 'active',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            status: 'active',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            status: 'active',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            status: 'active',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            status: 'active',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            status: 'active',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            status: 'active',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            status: 'active',
            date: '1/25/25',
        },
    ]

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-[#E7F7EF] text-[#00B627]';
            case 'inactive':
                return 'bg-[#FFF0E6] text-[#FE964A]';
            default:
                return 'text-gray-300';
        }
    };

    return (
        <>
            <Navbar text='Listings' />
            <div className="px-5">
                <div className="mt-7 rounded-lg border border-[#1C19171A] p-4">
                    <Filter ctg={true} date={true} />
                    <div className="overflow-x-auto mt-5 rounded-xl border border-[#1C19171A]">
                        <table className="w-full text-sm text-left rtl:text-right ">
                            <thead className="text-base border-b border-[#1C19171A]">
                                <tr className='text-nowrap'>
                                    <th scope="col" className="px-6 py-3 font-medium text-[#636363] text-sm">
                                        No.
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium text-[#636363] text-sm">
                                        Company Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium text-[#636363] text-sm">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium text-[#636363] text-sm">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium text-[#636363] text-sm">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium text-[#636363] text-sm">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 font-medium text-[#636363] text-sm">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.length > 0 ? (
                                    datas.map((list, i) => (
                                        <tr
                                            key={i}
                                            className="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 "
                                        >
                                            <td className=" px-6 py-4 text-black"><span className='line-clamp-1 text-nowrap'>{i + 1}</span></td>
                                            <td className=" px-6 py-4 text-black"><span className='line-clamp-1 text-nowrap capitalize'>{list.name}</span></td>
                                            <td className=" px-6 py-4 text-[#737B8C]"><span className='line-clamp-1 text-nowrap capitalize'>{list.email}</span></td>
                                            <td className=" px-6 py-4 text-[#737B8C]"><span className='line-clamp-1 text-nowrap capitalize'>{list.phone}</span></td>
                                            <td className=" px-6 py-4 text-black"><span className='line-clamp-1 text-nowrap capitalize'>{list.ctg}</span></td>
                                            <td className="px-6 py-4 "><span className={`line-clamp-1 text-nowrap rounded-full text-center px-5 py-2 w-fit capitalize ${getStatusClass(list.status)}`}>{list.status}</span></td>
                                            <td className=" px-6 py-4 text-[#737B8C]"><span className='line-clamp-1 text-nowrap capitalize'>{list.date}</span></td>
                                            <td className=" px-6 py-4 text-black">
                                                <button><HiOutlineDotsVertical /></button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">
                                            Date not Available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Listings