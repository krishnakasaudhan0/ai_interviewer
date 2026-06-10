import axios from "axios"
import {HttpsProxyAgent} from "https-proxy-agent"

const httpsAgent=new HttpsProxyAgent(process.env.PROXY_URL!)
export async function ScrapeGithub(githubURL: any){
    const githubUrl=githubURL;
    const githubUsername=githubUrl.split('/').pop();
    const userRepos=  await axios.request({
        url: `https://api.github.com/users/${githubUsername}/repos`,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
        },
        httpsAgent
    })
    return userRepos.data.map((x: any) => ({
    description : x.description,
    name: x.name,
    fullname : x.full_name,
    starCount : x.stargazers_count
   }))
}