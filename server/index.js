 const express =require('express');
 const app = express();
 const cors=require('cors');
 require('dotenv').config();
 const authRouter=require('./Router/AuthRouter');
 const ProductRouter=require('./Router/ProductRouter');

 
 require('./models/db');

 ;

app.get('/',(req,res)=>{
   res.send('PONG');
})

app.use(express.json());
app.use(cors());
app.use('/auth',authRouter) //database
app.use('/products',ProductRouter)
 const PORT=process.env.PORT || 5000;
 app.listen(PORT,()=>{
    console.log(`service running on ${PORT}`);
 }
)