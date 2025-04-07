import React from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi';
import Navbar from '../Components/Navbar';
import Filter from '../Utilies/Filter';
import { GrLocation } from "react-icons/gr";

const Users = () => {

    const datas = [
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            address: '528/3, Silver, ...',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            address: '528/3, Silver, ...',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            address: '528/3, Silver, ...',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            address: '528/3, Silver, ...',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            address: '528/3, Silver, ...',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            address: '528/3, Silver, ...',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            address: '528/3, Silver, ...',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            address: '528/3, Silver, ...',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            address: '528/3, Silver, ...',
            date: '1/25/25',
        },
        {
            name: 'real title service',
            email: 'example@email.com',
            phone: '+14445454487',
            ctg: 'Title Company',
            address: '528/3, Silver, ...',
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
            <Navbar text='Users' />
            <div className="px-5">
                <div className="mt-7 rounded-lg border border-[#1C19171A] p-4">
                    <Filter ctg={true} date={true} />
                    <div className="overflow-x-auto mt-5 rounded-xl border border-[#1C19171A]">
                        <table className="w-full text-sm text-left rtl:text-right ">
                            <thead className="text-base border-b border-[#1C19171A]">
                                <tr className='text-nowrap'>
                                    <th scope="col" className="px-6 py-3 text-sm font-medium text-[#636363]">
                                        No.
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-sm font-medium text-[#636363]">
                                        Company Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-sm font-medium text-[#636363]">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-sm font-medium text-[#636363]">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-sm font-medium text-[#636363]">
                                        Position
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-sm font-medium text-[#636363]">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-sm font-medium text-[#636363]">
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
                                            <td className=" px-6 py-4 text-black">
                                                <div className="flex flex-row gap-4 place-items-center">
                                                    <span className='text-[#1079E0] text-lg'><GrLocation /></span>
                                                    <span>{list.address}</span>
                                                </div>
                                            </td>
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

export default Users
