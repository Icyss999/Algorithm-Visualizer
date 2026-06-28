"use client";
import { Code2Icon, HomeIcon, Loader2Icon, SnowflakeIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/src/components/ui/sidebar";
import { authClient } from "@/src/lib/authClient";
import { useStore } from "@nanostores/react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getInitial } from "@/src/lib/utils";
import { PublicAlgorithmResponse } from "@/src/types/schema";
import { auth } from "@/src/lib/auth";
import Link from "next/link";

export function AppSidebar({
  session,
  data,
}: {
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
  data: PublicAlgorithmResponse[] | null;
}) {
  const { state } = useSidebar();
  const route = useRouter();

  const menuItems = [
    { name: "Home", href: "/home", icon: HomeIcon },
    { name: "Code", href: "/code", icon: Code2Icon },
  ];

  return (
    <Sidebar className="border-zinc-800" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="p-0">
        {state === "expanded" ? (
          <header className="flex items-center px-6 h-[70px] gap-5 shrink-0 border-white/10 border-b">
            <SidebarTrigger className="w-8 h-8 text-white cursor-pointer" />
            <span className="font-mono tracking-widest text-white text-base uppercase">
              Icyrythm
            </span>
          </header>
        ) : (
          <header className="p-2">
            <SidebarTrigger className="w-8 h-8 text-white cursor-pointer " />
          </header>
        )}
      </SidebarHeader>

      {/* Chat List */}
      <SidebarContent>
        <SidebarGroup>
          {state === "expanded" && data && (
            <div>
              <SidebarGroupLabel className="text-[grey]">
                {" "}
                Recent History
              </SidebarGroupLabel>
              {data.map((item) => (
                <Link key={item.id} className="" href={`/algorithm/${item.id}`}>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex text-white gap-3 hover:text-black cursor-pointer">
                      {item.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </div>
          )}
          {state === "expanded" && (
            <div className="flex flex-col gap-3">
              <SidebarGroupLabel className="text-[grey]">
                Menu
              </SidebarGroupLabel>
              {menuItems.map((item,z) => (
                <Link key={z} href={item.href}>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex text-white gap-3 hover:text-black cursor-pointer">
                      <item.icon />
                      {item.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </div>
          )}
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-white/10 px-3 py-3">
        <UserAvatar state={state} session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}

function UserAvatar({
  state,
  session,
}: {
  state: "expanded" | "collapsed";
  session: Awaited<ReturnType<typeof auth.api.getSession>>;
}) {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const username = session?.user?.name ?? "User";
  const email = session?.user?.email ?? "userexample@email.com";

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            route.push("/");
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger>
        {state === "expanded" ? (
          <div className="flex items-center gap-5 p-3 rounded-lg hover:bg-[#414141] w-full">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{getInitial(username)} </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <Label className="text-white text-base font-mono">
                {" "}
                {username}
              </Label>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-5 rounded-lg w-full">
            <Avatar className="w-7 h-7">
              <AvatarFallback className="text-sm">
                {getInitial(username)}{" "}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </DrawerTrigger>
      <DrawerContent className="bg-foreground h-full flex flex-col gap-3 border-zinc-800">
        <DrawerHeader>
          <DrawerTitle className="text-base p-5 text-white font-medium text-xl font-mono ">
            My Account
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="text-2xl font-mono">
              {getInitial(username)}
            </AvatarFallback>
          </Avatar>
          <Label className="text-white font-medium text-base font-mono">
            {" "}
            {username}
          </Label>
          <Label className="text-[grey] font-medium text-base font-mono">
            {" "}
            {email}
          </Label>
          <Button
            onClick={handleSignOut}
            className="p-5 font-medium text-white h-10 hover:bg-[#414141] active:bg-[#2d3f55] focus:outline-none border-zinc-500 bg-[] cursor-pointer "
          >
            {loading ? (
              <div className="flex gap-3 cursor-pointer">
                <Loader2Icon className="animate-spin" />
                <Label className="font-medium text-white"> Logging Out </Label>
              </div>
            ) : (
              <Label className="font-medium text-white cursor-pointer">
                Log Out
              </Label>
            )}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
