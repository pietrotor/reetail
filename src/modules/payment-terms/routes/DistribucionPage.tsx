import { OnConstruction } from "@/components/common/OnConstruction";
import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardHeader from "@/modules/dashboard/components/dashboard-header";

export const DistribucionPage = () => {
  return (
    <AuthLayout>
      <div className="relative flex flex-col w-full h-full">
        <DashboardHeader />
        <OnConstruction />
      </div>
    </AuthLayout>
  );
};
