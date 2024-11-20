import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8989;

import connectToDB from './dbConnect.js';
import studentRouter from './routes/studentRoutes.js';
import courseRouter from './routes/courseRoutes.js';

app.use(express.json());
app.use('/students',studentRouter);
app.use('/courses',courseRouter);

connectToDB(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to db");
        app.listen(PORT,(err) => {
            if(err) console.log("error connecting to server");
            else console.log("connected at port 8989")
        })
    }).catch(()=>console.log("error connecting to db"));