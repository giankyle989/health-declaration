const Health = require('../models/health.model')
const User = require('../models/user.model')
const asyncHandler = require("express-async-handler");

const getHealth = asyncHandler(async (req, res) => {
    Health.find({user:req.user.id})
        .then((health) => res.json(health))
        .catch((err) => res.status(400).json("Error: " + err))
})


const addHealth = asyncHandler(async  (req, res) => {
  const user = req.user.id
  const fullname = req.body.fullname;
  const temperature = req.body.temperature;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;

  const newHealthDeclaration = new Health({
    user,
    fullname,
    temperature,
    email,
    phonenumber,
  });

  newHealthDeclaration
    .save()
    .then((health) => res.json("New Record Added!"))
    .catch((err) => res.status(400).json("Error :" + err));
})



const deleteHealth = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user.id)

    if(!user){
      res.status(401)
      throw new Error("User not found")
    }
    


    Health.findByIdAndDelete(req.params.id)
    .then((health) => {
      
      if(health.user.toString() !== user.id){
        res.status(401)
        throw new Error("User not authorized")
      }
      res.json("Record was deleted")
    })
    .catch((err) => res.status(400).json("Error :" + err));
})

const updateHealth = asyncHandler(async (req,res) => {
  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error("User not found")
  }
  

  
      Health.findById(req.params.id)
        .then((health) => {
          
          if(health.user.toString() !== user.id){
            res.status(401)
            throw new Error("User not authorized")
          }
          health.fullname = req.body.fullname;
          health.temperature = req.body.temperature;
          health.email = req.body.email;
          health.phonenumber = req.body.phonenumber;

      health
        .save()
        .then((health) => res.json("Record was updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
})

module.exports = {getHealth, addHealth, updateHealth, deleteHealth}