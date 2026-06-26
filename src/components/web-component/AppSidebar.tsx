"use client";
import { Loader2Icon, SnowflakeIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/src/components/ui/sidebar";
import { authClient } from "@/src/lib/authClient";
import { useStore } from "@nanostores/react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/src/components/ui/drawer";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getInitial } from "@/src/lib/utils";

export function AppSidebar() {
  

  return (
    <Sidebar className="border-zinc-800">
      {/* Header */}
      <SidebarHeader className="p-0">
        <header className="flex items-center px-6 h-[70px] gap-5 shrink-0 border-white/10 border-b">
          <SnowflakeIcon className="w-5 h-5 text-white" />
          <span className="font-mono tracking-widest text-white text-base uppercase">
            Icyrythm
          </span>
        </header>
      </SidebarHeader>

      {/* Chat List */}
      <SidebarContent></SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-white/10 px-3 py-3">
        <UserAvatar/>
      </SidebarFooter>
    </Sidebar>
  );
}


function UserAvatar(){

    const [loading,setLoading] = useState(false)
    const route = useRouter()
    const {data:session} = useStore(authClient.useSession)
    const username = session?.user.name ?? "User"
    const email = session?.user.email ?? "userexample@email.com"


    const handleSignOut = async ()=>{
        try{
            setLoading(true)
            await authClient.signOut({
            fetchOptions:{
                onSuccess: ()=>{
                    route.push("/")
                }
            }
            })
        }finally{
            setLoading(false)
        }
    }

    return(
        <Drawer direction="left">
            <DrawerTrigger>
                <div className="flex items-center gap-5 p-5 rounded-lg hover:bg-[#414141] w-full">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback>{getInitial(username)} </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <Label className="text-white text-base font-mono"> {username}</Label>
                    </div>
                </div>
            </DrawerTrigger>
            <DrawerContent className="bg-foreground h-full flex flex-col gap-3 border-zinc-800" >
                <DrawerHeader> 
                    <DrawerTitle className="text-base p-5 text-white font-medium text-xl font-mono ">
                        My Account
                    </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col items-center gap-3">
                    <Avatar className="w-20 h-20">
                        <AvatarFallback className="text-2xl font-mono">{getInitial(username)}</AvatarFallback>
                    </Avatar>
                    <Label className="text-white font-medium text-base font-mono"> {username}</Label>
                    <Label className="text-[grey] font-medium text-base font-mono"> {email}</Label>
                    <Button
                    onClick = {handleSignOut}
                    className="p-5 font-medium text-white h-10 hover:bg-[#414141] active:bg-[#2d3f55] focus:outline-none border-zinc-500 bg-[] cursor-pointer "> 
                        {
                        loading? 
                        <div className="flex gap-3 cursor-pointer">
                           <Loader2Icon className="animate-spin"/>
                            <Label className="font-medium text-white"> Logging Out </Label>
                        </div>
                        : 
                        <Label className="font-medium text-white cursor-pointer">Log Out</Label>}
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
