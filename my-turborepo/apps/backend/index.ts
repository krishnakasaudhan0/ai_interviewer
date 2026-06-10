import express from "express";
import {PreInterviewBody} from "./types"
import axios from "axios"
import {ScrapeGithub} from "./scrapper/github.ts"
import cors from "cors"
import {prisma} from "./db"


const app=express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});

app.use(cors());

app.use(express.json())
app.post("/api/v1/pre-interview", async (req,res)=>{
    const {success,data}=PreInterviewBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Incorrect Body"
        });
        return
    }

    const githubUrl=data.github.endsWith("/") ? data.github.slice(0,-1) : data.github;
    // const linkedinUrl=data.linkedin.endsWith("/") ? data.linkedin.slice(0,-1) : data.linkedin;
    

    const githubUsername=githubUrl.split('/').pop();
    // const linkedinUsername=linkedinUrl.split('/').pop();


   

   try {
       const githubData = await ScrapeGithub(githubUrl);







       
       res.json({github:githubData})
   } catch (error: any) {
       console.error(error);
       res.status(500).json({
           message: "Failed to scrape github profile",
           error: error.message || error
       });
   }
})
app.listen(3001,()=>{
    console.log("backend active")
});
