const app=require("express")()

let logins={}

app.get("/",(req,res)=>{

    const etag=req.headers["if-none-matched"];

    if(req.headers.cookie){
        const user=req.headers.cookie.split("=")[1];
        createUserfromEtag(etag,user) // create user in db with that etag
    }
    else{
        // if no cookie present, recreate the zombie cookie
        const user=getUserfromEtag(etag); // get from the db

        if(user){
            res.setHeader("set-cookie",[`user=${user}`])
        }
    }
    console.log(etag)
    res.sendFile(`${__dirname}/index.html`)
})

app.get("/login",(req,res)=>{
    const user=req.query.user;
    res.setHeader("set-cookie",[`user=${user}`]);
    res.send('set')
})

function createUserfromEtag(etag,user){
    logins[etag]=user;
}
function getUserfromEtag(etag){
    return logins[etag]
}

app.listen(8081,()=>console.log("Listening to 8081"))
