import express from 'express';
const app = express();
const PORT = 8989;

import connectToDB from './dbConnect.js';
import studentRouter from './routes/studentRoutes.js';

app.use(express.json());
app.use('/students',studentRouter);

connectToDB("mongodb://localhost:27017/assignment")
    .then(() => {
        app.listen(PORT,(err) => {
            if(err) console.log("error connecting to server");
            else console.log("connected at port 8989")
        })
    }).catch(()=>console.log("error connecting to db"));