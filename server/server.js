import express from "express"; 
import 'dotenv/config'; 
import { PrismaClient } from "@prisma/client";
import cors from "cors"; 
import SendMailToUser from "./mailer.js"

const app = express(); 
const PORT = 8080; 
const prisma = new PrismaClient();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'], 
    credentials: true,
}));


app.get("/", (req, res) => { 
    res.json({message: "Hello from server"})
})

app.post("/api/form", async (req, res) => { 

    const {name, email} = req.body; 

    try{

        const createForm = await prisma.form.create({
            data: { 
                name: name,
                email: email
            }
        });

        await SendMailToUser(email); 
        return res.status(201).json({ message: "User data was successfully sent to the database" });

    } catch(error) { 
        console.error("Error:", error);
        return res.status(500).json({ error: "Backend Error", details: error.message });
    }
})


app.listen(PORT, () => { 
    console.log(`Your server is running on ${PORT}`)
})
