
import {useState} from "react"
import {Interview } from "./components/interview"
import {Form } from "./components/form"
import {Result } from "./components/Result"
import {Toaster} from "sonner"

export function App() {
  const [page,setPage]=useState<"form" | "interview" | "result">("form");
  return (
   <div>
    {page === 'form' && <Form/>}
    {page === 'interview' && <Interview/>}
    {page === 'result' && <Result/>}
    <Toaster/>
   </div>
  );
}

export default App;
