const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'));
//My middleware to get method
app.use((req,res,next)=>{
    // req.method = 'GET'; This is making every request get request
    req.requestTime = Date.now();
    console.log(req.method.toUpperCase() , req.path );
    next();
})

app.use('/dogs',(req,res,next)=>{
    console.log('Dogs');
    next();
})
/*
This runs for every route 
app.use((req,res,next)=>{
    const {password} = req.query;
    if(password === 'enticing'){
        next();
    }
    res.send('Enter Correct password')
})
*/
//middleware can be used in any route as callback 
const verifyPassword = (req,res,next)=>{
    const {password} = req.query;
    if(password === 'enticing'){
        next();
    }
    res.send('Enter Correct password')
}

app.get('/',(req,res)=>{
    console.log(`REQUEST DATE ${req.requestTime}`)
    res.send('Hii Thier!!');
})

app.get('/dogs',(req,res)=>{
    console.log(`REQUEST DATE ${req.requestTime}`)
    res.send('I am here!');
})
//Using middleware as callback function in the route to verify the query string 
app.get('/secret',verifyPassword,(req,res)=>{
    res.send('SEcret Revealed!!');
})

//If none of the routes are matching then this will run
app.use((req,res)=>{
    res.status(404).send('NOT FOUND!');
})
app.listen(3000,()=>{
    console.log('Listening at port 3000');
})