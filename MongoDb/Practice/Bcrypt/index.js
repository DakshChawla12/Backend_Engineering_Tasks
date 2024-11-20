import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

import connectToDB from './dbConnect.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userControllers.js';

app.use(express.json());

app.use('/user',userRoutes);
app.use('/auth',authRoutes);

connectToDB(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected to database");
        app.listen(PORT,(err)=>{
            if(err){
                console.log("error connecting to server");
            } else console.log(`connected at port ${PORT}`);
        })
    })