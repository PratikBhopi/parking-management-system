import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BookForm = ({ selectedSlot, bookedSlot, setBookedSlot, onNewBooking }) => {
  const [disabledBtn, setBtnDisabled] = useState(false);


  
  const bookSlot = async (values) => {
    console.log(values);
    try {
      const response = await fetch('http://localhost:3000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.status === 'ok') {
        toast("Slot booked successfully!");
        setBookedSlot(prev => [...prev, values.slot_No]);
        onNewBooking(values); // Call the callback with the new booking
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (bookedSlot.includes(selectedSlot)) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [selectedSlot, bookedSlot]);

  return (
    <div className='w-[370px] px-4 py-5 mt-20'>
      <Formik
        initialValues={{
          name: '',
          vehicle: '',
          slot_No: selectedSlot,
          contact: '',
          fromTime: '',
          toTime: '',
        }}
        onSubmit={bookSlot}
        enableReinitialize
      >
        {({ values, setFieldValue }) => {
          useEffect(() => {
            if (bookedSlot.includes(selectedSlot)) {
              setFieldValue('slot_No', `${selectedSlot} Already Filled`);
              setBtnDisabled(true);
            } else {
              setFieldValue('slot_No', selectedSlot);
              setBtnDisabled(false);
            }
          }, [selectedSlot, bookedSlot, setFieldValue]);

          return (
            <Form>
              <div className='w-full my-2'>
                <Field className='w-full px-3 py-3 border-blue-600 rounded-md border' name='name' type='text' placeholder='Name' required />
              </div>
              <div className='w-full my-2'>
                <Field className='w-full px-3 py-3 border-blue-600 rounded-md border' name='vehicle' type='text' placeholder='Vehicle Number' required />
              </div>
              <div className='w-full my-2'>
                <Field className='w-full px-3 py-3 border-blue-600 rounded-md border' name='slot_No' type='text' placeholder='Slot No.' disabled required />
              </div>
              <div className='w-full my-2'>
                <Field className='w-full px-3 py-3 border-blue-600 rounded-md border' name='contact' type='text' placeholder='Contact No.' required />
              </div>
              <div className='w-full my-2'>
                <Field className='w-full px-3 py-3 border-blue-600 rounded-md border' name='email' type='email' placeholder='Email' required />
              </div>
              <div className='w-full flex justify-between my-2'>
                <div className='w-[45%] px-2 mx-[1px] font-extrabold'>From:</div>
                <div className='w-[45%] px-2 mx-[1px] font-extrabold'>To:</div>
              </div>
              <div className='w-full flex justify-between my-2'>
                <Field type='time' className='w-[45%] border-blue-600 px-2 mx-[1px] py-3 rounded-md border' name='fromTime' placeholder='From' required />
                <Field type='time' className='w-[45%] border-blue-600 px-2 mx-[1px] py-3 rounded-md border' name='toTime' placeholder='To' required />
              </div>
              <div className='w-full my-2'>
                <button disabled={disabledBtn} className='w-full px-3 py-3 rounded-md border bg-blue-500 text-white' type='submit'>
                  {disabledBtn ? 'Slot Already Filled' : 'Book'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BookForm;
