import { ArrowUpRight, CircleUserRound } from "lucide-react";

import AppSidebarMenu from "./sidebar-menu";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";

import currentIcon from "@/assets/images/Logo-reeteil-Celeste.png";

export default function AppSidebar() {
  return (
    <Sidebar
      collapsible="none"
      className="min-h-[100vh] pt-5 p-[15px] bg-gradient-to-b from-[#F5F5F5] to-white gap-6 border-r sticky h-[100vh]"
    >
      <SidebarHeader className="flex flex-col gap-6">
        <img
          src={currentIcon}
          alt="current logo"
          className="mx-auto"
          width={150}
          height={21.63}
        />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <AppSidebarMenu />
      </SidebarContent>
      <Separator />
      <SidebarFooter className="flex-col gap-6">
        <div className="flex justify-between border p-2 rounded-lg">
          <div className="flex gap-2">
            <CircleUserRound />
            <span>abidan@reeteil.com</span>
          </div>
          <ArrowUpRight />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
