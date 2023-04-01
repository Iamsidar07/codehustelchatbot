import { Configuration,OpenAIApi } from "openai";
import * as dotenv from "dotenv"
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


dotenv.config();
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const configuration=new Configuration({
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
})

const openai= new OpenAIApi(configuration);

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.post("/api/v1", async(req, res) => {
    const { messages }= req.body;
    console.log(messages)
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            // { role: "user", content: message }
            {role:"system",content:"You are a helpfull and assistant coding chatbot. Your name is Codey and builed by Pillu🐻."},
            ...messages
        ]
    });

    console.log(completion.data.choices[0].message);
    res.json({
        completion: completion.data.choices[0].message
    })
});

app.listen(port,()=>console.log("listening",port))