import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-gray-bg w-full overflow-y-auto max-h-[100vh]">
        {children}
      </main>
    </SidebarProvider>
  );
}
