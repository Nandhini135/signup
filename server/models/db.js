const mongoose = require('mongoose');

const mongo_url="mongodb+srv://admin:admin@login.rtrwp.mongodb.net/";
mongoose.connect(mongo_url)
    .then(()=>{
        console.log('MongoDB Connected...');
        
    }).catch((err)=>{
        console.log('MongoDB connection Error:',err);
        
    })