import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"



dotenv.config()

mongoose.connect(process.env.MONGOOSE_URI).then(() => {
    console.log("connected to mongoDB")
}).catch((error) => {
    console.log(error)
})


const app = express();
app.use(express.json())


app.listen(3000, (req, res) => {
    console.log(`listning on port 3000`)
});

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });