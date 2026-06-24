"use client"
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { IntroType } from "@/src/components/web-component/Intro-Type";
import { useRouter } from "next/navigation";



export default function MainPage(){

    const route = useRouter()
    const handleRoute = ()=>{
        route.push("/algorithm")
    }

   
    return(
        <div 
        className="bg-[#0a0f14] h-screen"
        style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="flex flex-col gap-10 items-center justify-center min-h-screen">
                <Label className="text-white font-mono tracking-widest text-4xl"> Welcome To IcyRhythm</Label>
                <Label className="font-mono text-white tracking-widest text-lg"> The land where you can absorb the knowledge of algorithm</Label>
                <Button 
                className="font-mono tracking-widest text-base p-7 transform-transition hover:scale-105 duration-200 cursor-pointer"
                variant="outline"
                onClick = {()=>handleRoute()}
                > Begin the Great Journey!</Button>
                <IntroType/>
            </div>
        </div>
    )
}