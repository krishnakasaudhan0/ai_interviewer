import "../../styles/globals.css";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {toast} from "sonner"
import {BACKEND_URL} from "../lib/config"
import axios from "axios"

export function Form() {
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  async function onSubmit(){
    if(!github || !linkedin){
            toast("please provide valid github and linkedin")
    }
    await axios.post(`${BACKEND_URL}/api/v1/pre-interview`,{
        linkedin,
        github
    })

  }
  return (
    <div className="h-screen bg-gray-800 w-screen flex justify-center items-center">
      <div>
        <div className="p-4">
          <Input placeholder="linkdin url" onChange={e => setLinkedin(e.target.value)} />
        </div>

        <div className="p-4">
          <Input placeholder="github url" onChange={e => setGithub(e.target.value)} />
        </div>
        <div className="flex justify-center p-4">
          <Button onClick={onSubmit}> Start Interview</Button>
        </div>
      </div>
    </div>
  );
}

export default Form;
