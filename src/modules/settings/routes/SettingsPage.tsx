import { ChevronLeft } from "lucide-react";

import { ProfileInformation } from "../components";
import { UserIntegrations } from "../components/UserIntegrations";

import { EditIcon } from "@/components/icons";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui";
import DashboardHeader from "@/modules/dashboard/components/dashboard-header";

export const SettingsPage = () => {
  return (
    <AuthLayout>
      <div className="relative flex flex-col w-full h-full">
        <DashboardHeader />
        <div className="flex items-center gap-4 py-3 px-6">
          <button className="flex bg-[#FFFFFF] justify-center items-center rounded-[6px] py-2 px-[17px] gap-[3px] shadow-[22px_31px_15px_rgba(107,107,107,0.01),12px_17px_13px_rgba(107,107,107,0.05),5px_8px_9px_rgba(107,107,107,0.09),1px_2px_5px_rgba(107,107,107,0.1)]">
            <ChevronLeft strokeWidth={1.2} size={22} /> Go back
          </button>
          <h1>Settings</h1>
        </div>
        <div className="h-full bg-white px-6 py-4">
          <div className="w-full flex flex-wrap justify-between">
            <h1 className="font-medium text-xl mb-6">Basic Information</h1>
            <Button variant={"secondary"} className="!px-10">
              <EditIcon className="!fill-black" />
              Edit
            </Button>
          </div>
          <ProfileInformation />
          <UserIntegrations />
        </div>
      </div>
    </AuthLayout>
  );
};
