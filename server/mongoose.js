const mongoose = require('mongoose')


const slotdata = new mongoose.Schema({
    parkId:String,
    Slots:[
        {
            slot_No:String,
            vehicle_No:String,
            contact:String,
            name:String,
        }
    ]
},
{collection:"parkingData"})



const Slots_data = new mongoose.model('parkingData',slotdata)



module.exports = Slots_data


  