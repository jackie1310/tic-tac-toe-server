import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const app = express()
app.use(cors());
const PORT = 8080;

app.get("/api/game", async (req, res) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const generationConfig = {
        stopSequences: ["red"],
        maxOutputTokens: 100,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
    };
    const boardJson = req.query.board;

    if (boardJson && boardJson.length) {
        const prompt = []
        prompt.push('You are an expert tic tac toe player.')
        prompt.push('You play as O. focus on winning, play extremely well.')
        prompt.push('For the json content I provide as input, please just give me json output containing the row and the col (no explanation) of your next move so you can definitely win in this tic tac toe game.')
        prompt.push(boardJson)
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});
            const result = await model.generateContent(prompt.join(' '));
            const response = result.response;
            const text = response.text();

            console.log(text);

            const aiMove = JSON.parse(text);

            console.log(aiMove);

            res.json(aiMove);
        }
        catch(error) {
            console.error("Error during AI move generation:", error);
            res.status(500).json({ error: "Failed to generate AI move" });
        }
    }
    else {
        res.status(400).json({ error: "Invalid board data" });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})