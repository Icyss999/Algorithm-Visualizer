import { AppSidebar } from "@/src/components/web-component/AppSidebar"
import CodePage from "@/src/components/web-component/CodePage"
import ExplainationPage from "@/src/components/web-component/Explaination"
import { auth } from "@/src/lib/auth"
import { cookies } from "next/headers"




export default async function SectionPage ({params}:{params: Promise<{id:string,section:string}>}){

    const {id,section} = await params
    const cookieStore = await cookies()

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/agent/${id}`,{
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    const session = await auth.api.getSession({
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    const data = await res.json()
    

    const pageRender = ()=>{

        switch(section){
            case "code": return(<CodePage data={data.data[0]}/>)
            case "explain": return(<ExplainationPage data={data.data[0]}/>)
        }
    }


    return(
       <div className="flex">
             <AppSidebar data={null} session = {session}/>
       
             <div
               className="flex flex-col bg-foreground text-white overflow-hidden h-screen w-screen"
               style={{ fontFamily: "'Inter', sans-serif" }}
             >
                {pageRender()}
             </div>
           </div>
    )
}