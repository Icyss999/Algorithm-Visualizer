import { AppSidebar } from "@/src/components/web-component/AppSidebar";
import { HomePage } from "@/src/components/web-component/HomeClient";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";



export default async function Page() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/agent`,{
    headers: await headers(),
    cache : "no-store"
  })
  const data = await res.json()
  const session = await auth.api.getSession({
    headers: {
      Cookie: cookieStore.toString()
    }
  })


  return (

   <div className="flex">
      <AppSidebar data={data.data} session={session}/>
      <HomePage/>
   </div>
  );
}   
