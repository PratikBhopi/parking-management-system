
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Slots_data = require('./mongoose');
const sendEmail = require('./sendEmail');
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())



app.get('/', (req, res) => {
  res.send('Hello World!')
})
// const bookedSeats = ['A01', 'B02', 'C03', 'C019', 'A011', 'B009', 'C011', 'C010']

app.post("/book", async (req, res) => {
  const { vehicle, name, slot_No } = req.body
  try {

    const findSlot = await Slots_data.findOne({ parkId: "YES" })
    if (findSlot) {
      await Slots_data.updateOne({ parkId: 'YES' },
        {
          $push: {
            Slots: {
              name: req.body.name,
              vehicle_No: req.body.vehicle,
              slot_No: req.body.slot_No,
              contact: req.body.contact
            }
          }
        }
      )

    } else {
      const slot = await Slots_data({
        parkId:'YES',
        Slots: [{
          name: req.body.name,
          vehicle_No: req.body.vehicle,
          slot_No: req.body.slot_No,
          contact: req.body.contact,
          email:req.body.email,
        }
        ]

      })
      await slot.save()
    }


const recipientEmail = req.body.email;

   await sendEmail(recipientEmail,req.body.slot_No, req.body.vehicle,req.body.fromTime,req.body.toTime)
    // console.log(vehicle,slot_No,name)
    return res.json({ message: "fine", status: "ok" })

  } catch (error) {
    console.log(error)
    return res.json({ message: "invalid", status: "error" })


  }
})

app.get("/getbooking", async (req, res) => {

  try {
    const slot = await Slots_data.findOne({parkId:"YES"})
    // console.log(slot.Slots,"akdj")
    return res.json({ status: 'ok', booking: slot.Slots })
  } catch (error) {
    console.log(error)
    return res.json({ status: 'invalid', error: "Something wrong occured" })
  }
})


app.post('/delete',async (req,res)=>{
  const {slot_ID, vehicle} = req.body
  try {
    const filter = {slot_No:slot_ID}


const result = await Slots_data.updateOne(

  { "Slots.slot_No": slot_ID },
  { $pull: { Slots: { slot_No: slot_ID } } }

);
console.log(result)

  return res.json({status:'ok'})
  } catch (error) {
    console.log(error)
    return res.json({status:'error'})
  }
})


mongoose.connect('mongodb://localhost:27017/parkingProject')
  .then(() => {
    console.log('MongoDB connection successful');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });