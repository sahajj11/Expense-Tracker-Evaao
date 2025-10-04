import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import cors from "cors"
import expenseRouter from "./routes/expenseRoute.js"

dotenv.config()

const app=express()
const PORT=process.env.PORT

app.use(cors())
app.use(express.json())

connectDb()

app.use("/api",expenseRouter)

app.listen(PORT,()=>{
    console.log("server started")
})