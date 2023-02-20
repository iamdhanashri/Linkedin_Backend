const express=require("express")

const {connection}=require("./configs/db")
const {UserRoute}=require("./routes/user.route")
const {PostRoute}=require("./routes/post.route")
const {authenticate}=require("./middleware/authenticate.middleware")

const app=express()

app.use(express.json())

app.use("/users",UserRoute)
app.use(authenticate)
app.use("/posts",PostRoute)






app.listen(8080,async()=>{
    try{
        await connection
        console.log("db connected") 
    }catch(err){
        console.log(err)
    }
    console.log("port is running at 8080")
})