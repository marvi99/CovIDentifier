const express = require('express');
const path =  require ('path');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.send(path.join(__dirname,'public/mainpage.html'))
})

app.listen(port,()=>{
    console.log("server running");
});
