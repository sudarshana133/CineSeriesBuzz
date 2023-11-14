const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
const authRoute = require('./routes/auth');
const collectionRoute = require('./routes/collection');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/collection',collectionRoute);

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err))

app.get('/',(req,res)=>{
    res.send("hello to the api");
})
app.listen(PORT,()=>console.log(`SERVER RUNNING ON ${PORT} http://localhost:${PORT}`));