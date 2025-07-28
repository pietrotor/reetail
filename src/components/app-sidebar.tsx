import { ArrowUpRight, CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router";

import BalanceCard from "./balance-card";
import SearchBar from "./searchbar";
import AppSidebarMenu from "./sidebar-menu";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";

import HelpIcon from "@/assets/icons/help-icon";
import SettingsIcon from "@/assets/icons/setting-icon";
import currentIcon from "@/assets/images/currentLogo.png";
import { useCurrentUserStore } from "@/store/use-current-user";

export default function AppSidebar() {
  const { isClient } = useCurrentUserStore();
  const navigate = useNavigate();

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
          width={180}
          height={21.63}
        />
        {!isClient && <BalanceCard />}
        <SearchBar className="text-sm" placeholder="Search..." />
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
            <span>ivan@artasaka.com</span>
          </div>
          <ArrowUpRight />
        </div>
        {[
          {
            label: "Settings",
            url: "/settings",
            icon: SettingsIcon,
          },
          {
            label: "Help Center",
            icon: HelpIcon,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => {
              if (item.url) navigate(item.url);
            }}
          >
            <item.icon className="sidebar-icon" />
            <span>{item.label}</span>
          </div>
        ))}
      </SidebarFooter>
    </Sidebar>
  );
}
