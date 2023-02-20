const express=require("express")
const { UserModel } = require("../models/user.model");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const UserRoute=express.Router();



UserRoute.post("/register",(req,res)=>{
   const {name,email,gender,password,age,city}=req.body 
try{
    bcrypt.hash(password,5,async(err,secure_pass)=>{
        if(err){
            console.log(err.message)
        }else{
            const user=new UserModel({
                name,email,gender,password:secure_pass,age,city
            })
            await user.save()
        }
    })
    res.send("user registered successfully")

}catch(err){
    res.send("user not registered",err.message)
}


UserRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
  
         if(result){
            const token=jwt.sign({userID:user[0]._id},"masai")
            res.send({"msg":"login success","token":token})
         }else{
            res.send({"msg":"login not success"})
            
         }

            })
        }
        else{
            res.send({"msg":"wrong crendentials"})

        }
    }catch(err){
        res.send({"msg":"login not success","err":err.message})

    }
})

})

module.exports={
    UserRoute
}
