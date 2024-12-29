const express=require("express")
const app=express()

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/index.html`)
})

app.get("/login",(req,res)=>{
    const user=req.query.user;
    res.setHeader("set-cookie",[`user=${user}`])
    res.send("set")
})

app.listen(8080,()=>console.log("listening on port 8080"))