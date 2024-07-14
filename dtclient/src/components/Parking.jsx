import React, { useEffect, useState } from 'react';
import './parking.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BookForm from './BookForm';
import { FaMotorcycle } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa6";

const Parking = () => {
  const bookNo = [];
  for (let i = 0; i < 20; i++) {
    bookNo[i] = i + 1;
  }

  const [bookedSlotData, setBookedSlotData] = useState([]);
  const [selectedSlot, setSlot] = useState('');
  const [bookedSlot, setBookedSlot] = useState([]);

  const slotCheck = (e) => {
    setSlot(e.target.value);
  };

  useEffect(() => {
    bookedSlotData.forEach(slot => {
      // bookedSlot.push(slot.slot_No);
      const bookedElement = document.getElementById(slot.slot_No);
      if (bookedElement) {
        bookedElement.classList.add('bg-red-500', 'text-white');
      }
    });
  }, [bookedSlotData]);

  useEffect(() => {
    const getSeats = async () => {
      try {
        const response = await fetch('http://localhost:3000/getbooking');
        const data = await response.json();
        setBookedSlotData(data.booking);
      } catch (error) {
        console.log(error);
        toast("Server Timed Out...");
      }
    };
    getSeats();
  }, []);

  const handleNewBooking = (newBooking) => {
    setBookedSlotData(prevData => [...prevData, newBooking]);
  };

  return (
    <>
      <ToastContainer />
      <div className='w-screen h-screen relative overflow-x-hidden'>
        <div className='text-[30px] bg-blue-500 border-b border-b-slate-600 py-3 text-white pl-5 font-[600] fixed w-full'>
          Select your slot and park!
        </div>
        <div className='h-[70px] bg-slate-400'></div>
        <div className='w-full py-2 bg-slate-100 flex gap-4 px-10 items-center justify-between'>
          <div className='flex gap-5 items-center'>
            <div>Select Vehicle : </div>
            <div  className='w-16 h-16 bg-white border grid place-content-center rounded-full'>
              <FaMotorcycle className='size-[50px]' />
            </div>
            <div className='w-16 h-16 bg-white border grid place-content-center rounded-full'>
              <FaCarSide className='size-[50px]' />
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='w-[50px] h-[50px] text-white border bg-red-500 rounded-md text-[10px] grid place-content-center'>Booked</div>
            <div className='w-[50px] h-[50px] bg-white border rounded-md text-[10px] grid place-content-center'>Unbooked</div>
          </div>
        </div>
        <div className='w-full h-[90vh] flex items-center flex-wrap justify-between mb-20 z-[100]'>
          <div className='sm:w-[50%] w-full h-full flex items-start px-5 ml-5 border'>
            <BookForm selectedSlot={selectedSlot} bookedSlot={bookedSlot} setBookedSlot={setBookedSlot} onNewBooking={handleNewBooking} />
          </div>
          <div className='md:w-[40%] w-full h-[700px] gap-0 flex  justify-around'>
            <div className='w-[150px] slotsSize flex flex-wrap gap-[5px]'>
              {bookNo.map(book => {
                const id = `A0${book}`;
                return (
                  <button
                    id={id}
                    key={id}
                    onClick={(e) => slotCheck(e)}
                    value={id}
                    className='slots'>
                    {id}
                  </button>
                );
              })}
            </div>
            <div className='w-[150px] slotsSize flex flex-wrap gap-[5px]'>
              {bookNo.map(book => {
                const id = `B0${book}`;
                return (
                  <button
                    id={id}
                    key={id}
                    onClick={(e) => slotCheck(e)}
                    value={id}
                    className='slots'>
                    {id}
                  </button>
                );
              })}
            </div>
            <div className='w-[150px] slotsSize flex flex-wrap gap-[5px]'>
              {bookNo.map(book => {
                const id = `C0${book}`;
                return (
                  <button
                    id={id}
                    key={id}
                    onClick={(e) => slotCheck(e)}
                    value={id}
                    className='slots'>
                    {id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Parking;
