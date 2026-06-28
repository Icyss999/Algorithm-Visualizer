import { AppSidebar } from "@/src/components/web-component/AppSidebar";
import CodePanel from "@/src/components/web-component/CodePanel";
import Visualizer from "@/src/components/web-component/Visualizer";
import { auth } from "@/src/lib/auth";
import { PublicAlgorithmResponse } from "@/src/types/schema";
import { cookies } from "next/headers";


export const dynamic = "force-dynamic" 
export default async function AlgorithmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
    const cookieStore = await cookies() 

  
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/agent/${id}`,{
    headers: {
      Cookie: cookieStore.toString()
    },
    cache: "force-cache"
  })

  const data = await res.json()
  const session = await auth.api.getSession({
    headers:{
      Cookie: cookieStore.toString()
    }
    })

  return (
    <div className="flex">
      <AppSidebar data={null} session = {session}/>

      <div
        className="flex flex-col bg-foreground text-white overflow-hidden h-screen w-screen"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
          <>
            <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
              <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <Visualizer key={data.data[0].name} data={data.data[0]} />
              </div>
              <div className="lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 max-h-[300px] lg:max-h-none overflow-auto">
                <CodePanel
                  explain={data.data[0].explanation}
                  code={data.data[0].code}
                  totalSteps={data.data[0].steps.length}
                />
              </div>
            </div>
          </>
      </div>
    </div>
  );
}
