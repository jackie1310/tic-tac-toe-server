import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const app = express()
app.use(cors());
const PORT = 8080;

app.get("/hello", async (req, res) => {
    res.send({
        "message": "Hello World"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})