const express = require('express'); //package to spin up a server
const dotenv = require("dotenv");   //package to access environment variable
const jwt = require('jsonwebtoken'); //package to implement JWT in JS


// get config vars
dotenv.config(); 

//initialise express
const app = express();

//temporary way to check username password. In production, it will be accessed from database
const username = 'CrioHF'
const password = 'ThisIsInsecurePassword'

//middleware to verify JWT
app.post(
    "/verifyjwt", (req,res,next)=>{
        const authHeader = req.headers['authorization']  //Get authorization header
        const token = 'Replace with your code' //Get token from header
        if (token == null) return res.sendStatus(401) // if there isn't any token
        let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return res.send(decoded)
    });

//middleware to generate JWT    
app.post(
    "/getjwt", (req,res,next)=>{
        let token = jwt.sign({ sub: username }, process.env.TOKEN_SECRET);
        return res.send(token)
    });

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});