import express from "express"
import dotenv from"dotenv";
import router from "./router/router.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config()
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
const port =process.env.PORT ||5000


connectDb()

const app =express()
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api/user",router)

app.use(notFound)
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})