
const mongoose = require('mongoose');



const equipments = mongoose.createConnection("mongodb://localhost:27017/equipments");
equipments.on('error', console.error.bind(console, 'equipments connection error:'));
equipments.once('open', () => {
  console.log('equipments connected');
});

const userDB = mongoose.createConnection("mongodb://localhost:27017/user");
userDB.on('error', console.error.bind(console, 'userDB connection error:'));
userDB.once('open', () => {
  console.log('userDB connected');
});

  const EquipmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    equipment:{
        type:String,
        required:true
    },
    quantity:{
      type:Number,
      required:true
    }
  });


const UserSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true},
  password: {
    type:String,
    required:true}
});
const EquipmentCollection=equipments.model('EquipmentCollection',EquipmentSchema)
const UserCollection=userDB.model('UserCollection',UserSchema)



module.exports={ EquipmentCollection, UserCollection }