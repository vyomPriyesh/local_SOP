import React from 'react'
import { CgCalendarDates } from 'react-icons/cg'
import { IoSearchSharp } from 'react-icons/io5'
import { RiDownloadCloud2Line } from 'react-icons/ri'
import { TfiMapAlt, TfiViewListAlt } from 'react-icons/tfi'

const Filter = ({ state, ctg, date, down }) => {
  return (
    <>
      <div className="flex flex-row place-items-center justify-between">
        <div className="flex flex-row place-items-center gap-2 border h-full border-[#020C1626] bg-white rounded-xl py-3 px-3 w-96">
          <h1 className='text-xl'>
            <IoSearchSharp />
          </h1>
          <input type="search" name="" id="" className='border-0 w-full bg-transparent outline-none' placeholder='Search by Category name...' />
        </div>
        <div className="flex flex-row place-items-center gap-5">
          {state &&
            <div className="flex flex-row place-items-center gap-2 border h-full border-[#020C1626] bg-white rounded-xl px-5 py-3 cursor-pointer">
              <h1 className='text-xl'>
                <TfiMapAlt />
              </h1>
              <span className='text-base'>State</span>
            </div>
          }
          {ctg &&
            <div className="flex flex-row place-items-center gap-2 border h-full border-[#020C1626] bg-white rounded-xl px-5 py-3 cursor-pointer">
              <h1 className='text-xl'>
                <TfiViewListAlt />
              </h1>
              <span className='text-base'>Category</span>
            </div>
          }
          {date &&
            <div className="flex flex-row place-items-center gap-2 border h-full border-[#020C1626] bg-white rounded-xl px-5 py-3 cursor-pointer">
              <h1 className='text-xl'>
                <CgCalendarDates />
              </h1>
              <span className='text-base'>Date</span>
            </div>
          }
          {down &&
            <button className='flex flex-row place-items-center gap-2 bg-[#1079E0] text-white  rounded-xl px-5 py-3'>
              <RiDownloadCloud2Line />
              <span>XLSX</span>
            </button>
          }
        </div>
      </div>
    </>
  )
}

export default Filter
