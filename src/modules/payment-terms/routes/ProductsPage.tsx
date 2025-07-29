import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardHeader from "@/modules/dashboard/components/dashboard-header";
import ProductsTable from "@/modules/dashboard/components/products-table";

export const ProductsPage = () => {
  return (
    <AuthLayout>
      <div className="relative flex flex-col w-full h-full">
        <DashboardHeader />
        <div className="p-6 flex flex-col gap-6">
          <ProductsTable />
        </div>
      </div>
    </AuthLayout>
  );
};
