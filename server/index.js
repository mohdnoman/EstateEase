import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGOOSE_URI).then(() => {
    console.log("connected to mongoDB")
}).catch((error) => {
    console.log(error)
})


const app = express();



app.listen(3000, (req, res) => {
    console.log(`listning on port 3000`)
});