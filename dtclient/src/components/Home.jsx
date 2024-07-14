import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';



const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='w-screen h-screen bg-slate-100 bg-no-repeat bg-cover overflow-x-hidden'>
      <div className='w-full h-20 z-[10] py-2 shadow-md bg-[#fdfdfd] flex justify-between items-center  gap-6 text-[19px] px-7'>
        <div className='font-[600] text-blue-500'>Parking.COM</div>
        <div className='flex gap-3'>
          <div>Home</div>
          <div>Contact</div>
          <div>Support</div>
          <div>Community</div>
        </div>

      </div>
      <div className='realtive w-full h-[85vh]  flex justify-center overflow-hidden items-start flex-col bg-[url(./Images/bg.jpg)] bg-cover  border-b-4 border-slate-500'>
        <div className='bg-[#1111118d] h-full flex items-start flex-col justify-center'>
          <h1 className='z-[10] ml-[100px] text-[6vw] text-white font-extrabold mt-5'>Parking.com</h1>
          <h1 className='z-[10] ml-[100px] text-[22px] text-yellow-600 font-[700] my-2'>PARK . BETTER . PERIOD.</h1>
          <h1 className='z-[10] ml-[100px] text-[40px]  text-white  font-[500]'>Finding parking shouldn’t be a hassle. Let’s get you parked and on to the bigger things.</h1>
          <div className='w-full ml-[100px] mt-10 text-start z-[10]'>
            <Link className='z-[10]  bg-red-500 font-[600] my-2 text-white text-[20px]  py-2 rounded-full px-6 border' to="/book">Book Your Slot</Link>
          </div>
        </div>

      </div>
      <div className='flex justify-center'>

        <div className='w-[500px] z-[10] -translate-y-[110px] py-10 bg-[#eeeeeee6] text-center shadow-lg rounded-lg border border-black'>
          <h1 className='text-[22px] font-extrabold capitalize  '>🔵We have a spot for you🔵</h1>
          <h1 className='text-[22px] font-extrabold capitalize '>Book Your Slot</h1>
        </div>

      </div>

    </div>
  )
}

export default Home
