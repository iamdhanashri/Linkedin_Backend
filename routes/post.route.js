const express = require("express")
const { PostModel } = require("../models/post.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const PostRoute = express.Router();

PostRoute.get("/", async (req, res) => {
    let query={}
    if(req.query.device){
        query.device=req.query.device
    }

    const posts = await PostModel.find(query)
    res.send(posts)
})

PostRoute.post("/create", async (req, res) => {
    try {

        const post = new PostModel(req.body)
        await post.save()
        res.send(post)

    } catch (err) {
        res.send("post not created", err.message)
    }


})

PostRoute.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await PostModel.findOne({"_id":id})
    const userID_notes=note.user
    const userID_req=req.body.user
    try{
        if(userID_req==userID_notes){
            await PostModel.findByIdAndUpdate({_id:id},req.body)
            req.send("post updated")
        }else{
            res.send("not auth")
        }
    }catch(err){
        res.send("something wrong")
    }
})



PostRoute.delete("/delete/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await PostModel.findOne({"_id":id})
    const userID_notes=note.user
    const userID_req=req.body.user
    try{
        if(userID_req==userID_notes){
            await PostModel.findByIdAndDelete({_id:id})
            req.send("post deleted")
        }else{
            res.send("not auth")
        }
    }catch(err){
        res.send("something wrong")
    }
})



module.exports = {
    PostRoute
}
