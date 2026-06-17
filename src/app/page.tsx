"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IcyssAgent } from "../agent/agent";
import { useState } from "react";
import { ResponseType } from "../types/schema";
import { Loader2 } from "lucide-react";

export default function Home() {

    const [algorithm,setAlgorithm] = useState<string>("")
    const [value,setValue] = useState<ResponseType>()
    const [loading,setLoading] = useState<boolean>(false)

    const handleClick = async (input:string)=>{
        try{
            setLoading(true)
            const res:ResponseType = await IcyssAgent(input)
            if (!res) return 
            setValue(res)
            console.log(res)
        }finally{
            setLoading(false)
        }
    }
  return (
    <>
        <div className="p-5 flex gap-10"> 
            <Input 
            className="w-[500px]"
            value = {algorithm}
            onChange={(e)=>setAlgorithm(e.target.value)}/>
            <Button
            onClick={()=>handleClick(algorithm)}>Enter</Button>
            
        </div>
        <div>
            {loading? 
            <div className="flex gap-10">
                <Loader2 className="animate-spin"/>
                <p> Loading </p>
            </div>: 
            value?.type === "visualization"? `Algorithm Name: ${value.name}` : ""}
            
        </div>
    </>
  );
}
