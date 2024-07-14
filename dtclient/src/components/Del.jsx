import React, { useState, useEffect } from 'react'
import { Form, Formik, Field } from 'formik'

const Del = () => {


  const bookNo = [];
  for (let i = 0; i < 20; i++) {
    bookNo[i] = i + 1;
  }

  const [bookedSlotData, setBookedSlotData] = useState([]);
  const [selectedSlot, setSlot] = useState('');
  // const [bookedSlot, setBookedSlot] = useState([]);
  const [showSteps, setShowSteps] = useState(false)

  const [userDat , setUserData] = useState({})


  const slotCheck = (e) => {
    const value = e.target.value;
    setSlot(value);

    const foundSlot = bookedSlotData.find(arr => arr.slot_No == value);
    if (foundSlot) {
      setUserData(foundSlot);
      console.log(userDat)
    } else {
      console.log('No One');
    }
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
        console.log(bookedSlotData)
      } catch (error) {
        console.log(error);
        toast("Server Timed Out...");
      }
    };
    getSeats();
  }, []);


  const updateField = async (values) => {
     await alert("Confirm to Empty the slot!")

    try {
      const response = await fetch('http://localhost:3000/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json()
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }




  return (
    <>
      <div className='w-screen h-screen flex justify-between bg-[#ffffff]  items-center' >

        <div className='w-2/3 '>
          <div className='w-full h-[700px] gap-0 flex flex-wrap justify-around'>
            <div className='w-[150px] flex flex-wrap gap-[5px]'>
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
            <div className='w-[150px] flex flex-wrap gap-[5px]'>
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
            <div className='w-[150px] flex flex-wrap gap-[5px]'>
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

        <div className='w-1/3 h-full  bg-slate-100 relative'>

          <div className='py-4 pl-10 bg-blue-500 text-white'>
            <h1 className='text-2xl'>Admin's Portal:</h1>
          </div>
          <div className='mt-5 mx-10'>
            <h1 onClick={()=>setShowSteps(!showSteps)} className='border border-blue-300 px-2 py-2'>Instructions:</h1>
            {
              showSteps &&
              <>
                <div className='py-2 px-3' >
                  <h1>1.Add the slot's ID</h1>
                  <h1>2.Click On update</h1>
                </div>
              </>
            }

          </div>
          <div className='py-5'>

            <div className='px-5 py-3 flex justify-center items-center '>
              <Formik
                initialValues={
                  {
                    slot_ID: '',
                    // vehicle:''
                  }}
                onSubmit={updateField}

              >
                <Form className='px-2 py-2'>
                  <div className='my-1 px-4 w-full '>
                    <Field name='slot_ID' type='text' className='border py-2 px-2 my-2' placeholder='Slot No' />

                  </div>
                  {/* <div className='my-1 px-4 w-full '>
            <Field name='vehicle' type='text' className='border py-2 my-2 px-2'  placeholder='vehicle'/>

            </div> */}
                  <div className='my-1 px-4 w-full'>
                    <button className='bg-blue-900 px-4 py-1 w-full text-white' type='submit'>Update</button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>

          <div className='w-full absolute bottom-0'>
            <div className='mx-10 my-10 border px-2 py-3'>
              <h1 className='py-3 text-[20px]'>User's Details:</h1>
              <div  className='text-[19px] font-[500] '>Slot No. : {userDat.slot_No}</div>
              <div  className='text-[19px] font-[500] '>User Name : {userDat.name}</div>
              <div className='text-[19px] font-[500] '>Vehicle No. : {userDat.vehicle_No}</div>
              <div  className='text-[19px] font-[500] '>Contact No. : {userDat.contact}</div>
            </div>
          </div>

        </div>


      </div>
    </>
  )
}

export default Del
